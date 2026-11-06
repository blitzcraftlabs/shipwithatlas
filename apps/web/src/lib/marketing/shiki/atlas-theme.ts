import type { ThemeRegistration } from "shiki"

/**
 * Atlas editor theme — restrained but readable at marketing scale.
 * Cobalt keywords, pale cyan types/functions, neutral identifiers.
 */
export const atlasTheme: ThemeRegistration = {
  name: "atlas",
  type: "dark",
  colors: {
    "editor.background": "#151820",
    "editor.foreground": "#e4e8f0",
    "editorLineNumber.foreground": "#5c6474",
    "editorLineNumber.activeForeground": "#8a93a6",
    "editor.selectionBackground": "#2a3550",
    "editor.lineHighlightBackground": "#1c2230",
    "editor.lineHighlightBorder": "#00000000",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#6a7384", fontStyle: "italic" },
    },
    {
      scope: [
        "keyword",
        "storage.type",
        "storage.modifier",
        "keyword.control",
        "keyword.operator.new",
        "keyword.other",
      ],
      settings: { foreground: "#5b9dff" },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call entity.name.function",
      ],
      settings: { foreground: "#8fd4ef" },
    },
    {
      scope: [
        "entity.name.type",
        "support.type",
        "entity.name.class",
        "support.class",
        "entity.other.inherited-class",
      ],
      settings: { foreground: "#9ad8f0" },
    },
    {
      scope: ["string", "constant.other.symbol", "markup.raw", "string.quoted"],
      settings: { foreground: "#c4b8e8" },
    },
    {
      scope: [
        "variable",
        "variable.other",
        "support.variable",
        "entity.name.variable",
      ],
      settings: { foreground: "#e8ebf2" },
    },
    {
      scope: [
        "variable.other.property",
        "support.type.property-name",
        "meta.object-literal.key",
        "variable.other.object.property",
      ],
      settings: { foreground: "#dce2ec" },
    },
    {
      scope: ["constant.numeric", "constant.language"],
      settings: { foreground: "#9db0c8" },
    },
    {
      scope: ["punctuation", "meta.brace", "punctuation.separator"],
      settings: { foreground: "#707888" },
    },
    {
      scope: [
        "entity.name.tag",
        "support.class.component",
        "support.class.component.tsx",
      ],
      settings: { foreground: "#6b9fff" },
    },
    {
      scope: ["markup.heading", "entity.name.section"],
      settings: { foreground: "#6b9fff", fontStyle: "bold" },
    },
    {
      scope: ["markup.list", "markup.list.numbered"],
      settings: { foreground: "#8b93a3" },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#8fd4ef" },
    },
    {
      scope: ["markup.bold"],
      settings: { fontStyle: "bold", foreground: "#e4e8f0" },
    },
  ],
}
