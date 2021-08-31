<template>
  <div class="tiptap-wrapper">
    <!-- menu -->
    <div class="tiptap-menu d-flex flex-wrap align-items-center" v-if="editor">
      <!-- basic formatting -->
      <div>
        <!-- heading -->
        <button
          type="button"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          h1
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          h2
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          h3
        </button>

        <!-- paragraph-->
        <button
          type="button"
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          <i class="fas fa-paragraph"></i>
        </button>

        <!-- bold -->
        <button
          type="button"
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <i class="fas fa-bold"></i>
        </button>

        <!-- underline -->
        <button
          type="button"
          @click="editor.chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('underline') }"
        >
          <i class="fas fa-underline"></i>
        </button>

        <!-- italic -->
        <button
          type="button"
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <i class="fas fa-italic"></i>
        </button>

        <!-- strike through -->
        <button
          type="button"
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <i class="fas fa-strikethrough"></i>
        </button>

        <!-- high light -->
        <button
          type="button"
          @click="editor.chain().focus().toggleHighlight().run()"
          :class="{ 'is-active': editor.isActive('highlight') }"
        >
          <i class="fas fa-highlighter"></i>
        </button>

        <!-- text align -->
        <button
          type="button"
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        >
          <i class="fas fa-align-left"></i>
        </button>
        <button
          type="button"
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
          <i class="fas fa-align-center"></i>
        </button>
        <button
          type="button"
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
          <i class="fas fa-align-right"></i>
        </button>
        <button
          type="button"
          @click="editor.chain().focus().setTextAlign('justify').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
        >
          <i class="fas fa-align-justify"></i>
        </button>

        <!-- link -->
        <button
          type="button"
          @click="setLink"
          :class="{ 'is-active': editor.isActive('link') }"
        >
          <i class="fas fa-link"></i>
        </button>

        <!-- unlink -->
        <button
          type="button"
          @click="editor.chain().focus().unsetLink().run()"
          v-if="editor.isActive('link')"
        >
          <i class="fas fa-unlink"></i>
        </button>

        <!-- image by link -->
        <button type="button" @click="addImage">
          <i class="far fa-image"></i>
        </button>

        <!-- bullet list -->
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          <i class="fas fa-list-ul"></i>
        </button>

        <!-- ordered list -->
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          <i class="fas fa-list-ol"></i>
        </button>
      </div>
    </div>

    <editor-content :editor="editor" />
  </div>
</template>

<script>
import {
  Editor,
  EditorContent,
  // BubbleMenu,
  // FloatingMenu
} from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Mention from "@tiptap/extension-mention";
export default {
  components: {
    EditorContent,
    // BubbleMenu,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;
      // JSON
      // const isSame = this.editor.getJSON().toString() === value.toString()
      if (isSame) {
        return;
      }
      this.editor.commands.setContent(this.modelValue, false);
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.modelValue,
      extensions: [
        StarterKit,
        Highlight.configure({ multicolor: true }),
        Typography,
        Image,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Link,
        Underline,
      ],
      onUpdate: () => {
        this.$emit("update:modelValue", this.editor.getHTML());
      },
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
  methods: {
    addImage() {
      const url = window.prompt("URL img");
      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run();
      }
    },
    setLink() {
      const url = window.prompt("URL link");
      this.editor.chain().focus().setLink({ href: url }).run();
    },
  },
};
</script>
<style lang="scss">
.bubble-menu {
  display: flex;
  background-color: #0d0d0d;
  padding: 0.2rem;
  border-radius: 0.5rem;
  button {
    border: none;
    background: none;
    color: #fff;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;
    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}
.floating-menu {
  display: flex;
  background-color: #0d0d0d10;
  padding: 0.2rem;
  border-radius: 0.5rem;
  button {
    border: none;
    background: none;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;
    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}
</style>
