"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useStore } from "@/store/useStore";
import { Pencil, Check, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EditableTextProps {
  id: string;
  defaultValue: string;
  tag?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
  className?: string;
  multiline?: boolean;
}

const EditableText = ({ id, defaultValue, tag: Tag = "span", className = "", multiline = false }: EditableTextProps) => {
  const { isAdminMode, siteData, setCustomText, language } = useStore();
  
  // Use a language-specific key to avoid cross-language overwrites
  const storageKey = id.includes(language) ? id : `${id}-${language}`;
  
  const customTexts = siteData?.customTexts || {};
  const displayValue = customTexts[storageKey] !== undefined ? customTexts[storageKey] : defaultValue;
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(displayValue);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setTempValue(displayValue);
  }, [displayValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (tempValue === displayValue) {
      setIsEditing(false);
      return;
    }
    
    setIsSaving(true);
    try {
      await setCustomText(storageKey, tempValue);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save text:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      handleSave();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setTempValue(displayValue);
    }
  };

  if (!isAdminMode) {
    return <Tag className={className}>{displayValue}</Tag>;
  }

  if (isEditing) {
    return (
      <div className="relative inline-block w-full z-10">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            disabled={isSaving}
            className="w-full bg-yellow-50 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-accent rounded-lg px-3 py-2 outline-none shadow-xl text-sm resize-y min-h-[100px] transition-all"
            rows={4}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            disabled={isSaving}
            className="w-full bg-yellow-50 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-accent rounded-lg px-3 py-2 outline-none shadow-xl text-sm transition-all"
          />
        )}
        <div className="absolute -top-3 -right-2 flex gap-1">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-green-500 text-white p-1.5 rounded-full shadow-lg hover:bg-green-600 transition-colors disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
          </button>
          {!isSaving && (
            <button
              onClick={() => setIsEditing(false)}
              className="bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Tag
      className={`${className} relative cursor-pointer group transition-all duration-300`}
      onClick={() => setIsEditing(true)}
      title="Cliquer pour modifier"
    >
      <span className="outline-dashed outline-2 outline-transparent group-hover:outline-accent/50 outline-offset-4 rounded transition-all inline-block">
        {displayValue}
      </span>
      <span className="inline-flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="bg-accent/10 text-accent p-1 rounded-full shadow-sm">
          <Pencil className="w-3 h-3" />
        </span>
      </span>
    </Tag>
  );
};

export default EditableText;

/**
 * GlobalEditableProvider - Makes ALL text on the page editable in admin mode.
 * Handles the application of saved global edits by searching the DOM.
 */
export function GlobalEditableProvider({ children }: { children: React.ReactNode }) {
  const { isAdminMode, siteData, setCustomText, firebaseReady } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply saved global texts
  useEffect(() => {
    if (!firebaseReady || !containerRef.current) return;
    
    const applyGlobalTexts = () => {
      const texts = siteData?.customTexts || {};
      Object.entries(texts).forEach(([key, value]) => {
        if (key.startsWith("global-")) {
          try {
            // The key is a selector-like string: global-tag#id.class[idx]>...
            // We use underscores for dots in the stored key to avoid Firebase issues
            const selectorPath = key.replace("global-", "").replace(/_/g, ".");
            const elements = findElementsByPath(containerRef.current!, selectorPath);
            elements.forEach(el => {
              if (el.textContent !== value) {
                el.textContent = value;
              }
            });
          } catch (e) {
            // Best effort
          }
        }
      });
    };

    applyGlobalTexts();
    // Re-apply if content changes (e.g. tabs)
    const observer = new MutationObserver(applyGlobalTexts);
    observer.observe(containerRef.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [siteData.customTexts, firebaseReady]);

  const handleClick = useCallback((e: MouseEvent) => {
    if (!isAdminMode) return;

    const target = e.target as HTMLElement;
    if (
      target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "BUTTON" ||
      target.tagName === "IMG" || target.tagName === "SVG" || target.tagName === "PATH" ||
      target.tagName === "A" || target.isContentEditable ||
      target.closest("button") || target.closest("input") || target.closest("textarea") ||
      target.closest(".admin-bar-wrapper") || target.closest("[data-no-edit]") ||
      target.closest(".modal-overlay") || target.closest(".professional-gallery-admin")
    ) return;

    const hasDirectText = Array.from(target.childNodes).some(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
    );
    if (!hasDirectText) return;

    e.preventDefault();
    e.stopPropagation();

    const key = generateEditKey(target);
    const currentText = target.textContent?.trim() || "";

    const originalHTML = target.innerHTML;
    const fontSize = getComputedStyle(target).fontSize;

    const input = document.createElement("input");
    input.type = "text";
    input.value = (siteData?.customTexts || {})[key] || currentText;
    input.style.cssText = `
      width: 100%; background: #FFFDE7; color: #333; border: 2px solid #F9A825;
      border-radius: 8px; padding: 4px 8px; outline: none; font-family: inherit;
      font-size: ${fontSize}; font-weight: inherit; box-shadow: 0 4px 12px rgba(249,168,37,.2);
      position: relative; z-index: 1000;
    `;

    target.innerHTML = "";
    target.appendChild(input);
    input.focus();
    input.select();

    const save = async () => {
      const val = input.value.trim();
      target.innerHTML = originalHTML;
      if (val && val !== currentText) {
        target.textContent = val;
        await setCustomText(key, val);
      }
    };

    input.addEventListener("blur", save);
    input.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") { save(); }
      if (ev.key === "Escape") { target.innerHTML = originalHTML; }
    });
  }, [isAdminMode, siteData?.customTexts, setCustomText]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("click", handleClick, true);
    return () => container.removeEventListener("click", handleClick, true);
  }, [handleClick]);

  return (
    <div ref={containerRef} className={isAdminMode ? "admin-editing-active" : ""}>
      {children}
    </div>
  );
}

function generateEditKey(el: HTMLElement): string {
  const parts: string[] = [];
  let current: HTMLElement | null = el;
  let depth = 0;
  while (current && depth < 5) {
    const tag = current.tagName.toLowerCase();
    const id = current.id ? `#${current.id}` : "";
    const cls = current.className && typeof current.className === "string"
      ? "." + current.className.split(" ").slice(0, 1).join(".")
      : "";
    const idx = current.parentElement
      ? Array.from(current.parentElement.children).indexOf(current)
      : 0;
    parts.unshift(`${tag}${id}${cls}[${idx}]`);
    current = current.parentElement;
    depth++;
  }
  // Store with underscores instead of dots for Firebase safety
  return "global-" + parts.join(">").replace(/\./g, "_");
}

function findElementsByPath(container: HTMLElement, path: string): HTMLElement[] {
  const parts = path.split(">");
  let currentElements: HTMLElement[] = [container];
  
  for (const part of parts) {
    const nextElements: HTMLElement[] = [];
    const match = part.match(/^([a-z0-9]+)(#?[^\[]*)\[(\d+)\]$/);
    if (!match) continue;
    
    const [_, tag, selector, indexStr] = match;
    const index = parseInt(indexStr);
    
    currentElements.forEach(parent => {
      const children = Array.from(parent.children) as HTMLElement[];
      const matches = children.filter(child => {
        const tagMatch = child.tagName.toLowerCase() === tag;
        const selectorMatch = !selector || (selector.startsWith("#") ? child.id === selector.slice(1) : child.classList.contains(selector.slice(1)));
        return tagMatch && selectorMatch;
      });
      if (matches[index]) {
        nextElements.push(matches[index]);
      }
    });
    currentElements = nextElements;
  }
  return currentElements;
}
