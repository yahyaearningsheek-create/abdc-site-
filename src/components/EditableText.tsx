"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useStore } from "@/store/useStore";
import { Pencil, Check } from "lucide-react";

interface EditableTextProps {
  id: string;
  defaultValue: string;
  tag?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
  className?: string;
  multiline?: boolean;
}

const EditableText = ({ id, defaultValue, tag: Tag = "span", className = "", multiline = false }: EditableTextProps) => {
  const { isAdminMode, siteData, setCustomText } = useStore();
  const customTexts = siteData?.customTexts || {};
  const displayValue = customTexts[id] !== undefined ? customTexts[id] : defaultValue;
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(displayValue);
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

  const handleSave = () => {
    setIsEditing(false);
    if (tempValue !== displayValue) {
      setCustomText(id, tempValue);
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
      <div className="relative inline-block w-full">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full bg-yellow-50 text-gray-900 border-2 border-accent rounded-lg px-3 py-2 outline-none shadow-lg text-sm resize-y min-h-[80px]"
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
            className="w-full bg-yellow-50 text-gray-900 border-2 border-accent rounded-lg px-3 py-2 outline-none shadow-lg text-sm"
          />
        )}
        <button
          onClick={handleSave}
          className="absolute -top-2 -right-2 bg-accent text-white p-1 rounded-full shadow-md hover:bg-accent-dark transition-colors"
        >
          <Check className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <Tag
      className={`${className} relative cursor-pointer group`}
      onClick={() => setIsEditing(true)}
      title="Cliquer pour modifier"
    >
      <span className="outline-dashed outline-2 outline-transparent group-hover:outline-accent outline-offset-4 rounded transition-all inline">
        {displayValue}
      </span>
      <span className="inline-flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="bg-accent text-white p-1 rounded-full shadow-sm">
          <Pencil className="w-3 h-3" />
        </span>
      </span>
    </Tag>
  );
};

export default EditableText;

/**
 * GlobalEditableProvider - Makes ALL text on the page editable in admin mode.
 * Wrap the page content with this and it will intercept clicks on any text
 * element to allow inline editing with no limits.
 */
export function GlobalEditableProvider({ children }: { children: React.ReactNode }) {
  const { isAdminMode, siteData, setCustomText } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((e: MouseEvent) => {
    if (!isAdminMode) return;

    const target = e.target as HTMLElement;
    // Don't edit inputs, buttons, images, svgs, or elements already being edited
    if (
      target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "BUTTON" ||
      target.tagName === "IMG" || target.tagName === "SVG" || target.tagName === "PATH" ||
      target.tagName === "A" || target.isContentEditable ||
      target.closest("button") || target.closest("input") || target.closest("textarea") ||
      target.closest(".admin-bar-wrapper") || target.closest("[data-no-edit]") ||
      target.closest(".modal-overlay")
    ) return;

    // Only edit leaf text nodes (elements that directly contain text)
    const hasDirectText = Array.from(target.childNodes).some(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
    );
    if (!hasDirectText) return;

    e.preventDefault();
    e.stopPropagation();

    // Generate a unique key based on element path
    const key = generateEditKey(target);
    const currentText = target.textContent?.trim() || "";

    // Create inline input
    const originalHTML = target.innerHTML;
    const originalColor = getComputedStyle(target).color;
    const fontSize = getComputedStyle(target).fontSize;

    const input = document.createElement("input");
    input.type = "text";
    input.value = (siteData?.customTexts || {})[key] || currentText;
    input.style.cssText = `
      width: 100%; background: #FFFDE7; color: #333; border: 2px solid #F9A825;
      border-radius: 8px; padding: 4px 8px; outline: none; font-family: inherit;
      font-size: ${fontSize}; font-weight: inherit; box-shadow: 0 4px 12px rgba(249,168,37,.2);
    `;

    target.innerHTML = "";
    target.appendChild(input);
    input.focus();
    input.select();

    const save = () => {
      const val = input.value.trim();
      target.innerHTML = originalHTML;
      if (val && val !== currentText) {
        target.textContent = val;
        setCustomText(key, val);
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

  // Apply saved custom texts on mount
  useEffect(() => {
    if (!containerRef.current) return;
    const texts = siteData?.customTexts || {};
    Object.keys(texts).forEach((key) => {
      if (key.startsWith("global-")) {
        // Try to find and update elements
        const parts = key.replace("global-", "").split("__");
        // This is best-effort; EditableText handles its own keys
      }
    });
  }, [siteData.customTexts]);

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
      ? "." + current.className.split(" ").slice(0, 2).join(".")
      : "";
    const idx = current.parentElement
      ? Array.from(current.parentElement.children).indexOf(current)
      : 0;
    parts.unshift(`${tag}${id}${cls}[${idx}]`);
    current = current.parentElement;
    depth++;
  }
  return "global-" + parts.join(">");
}
