'use client'

import React, { useState, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FaBold, FaHeading, FaParagraph } from 'react-icons/fa';
import { BiHeading } from 'react-icons/bi';

const TiptapEditor = ({ content, setContent }) => {
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    immediatelyRender:false
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading editor...</div>;
  }

  if (!editor) {
    return null;
  }

  const addHeading = (level) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  const addBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const addParagraph = () => {
    editor.chain().focus().setParagraph().run();
  };

  return (
    <div className="container mx-auto p-4 " style={{ overflowY: 'auto' }}>
      <div className="toolbar flex md:flex-nowrap flex-wrap gap-2 mb-4">
        <button
          className="flex items-center gap-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
          onClick={() => addHeading(1)}>
          <FaHeading size={28} /> H1
        </button>
        <button
          className="flex items-center gap-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
          onClick={() => addHeading(2)}>
          <BiHeading size={24} /> H2
        </button>
        <button
          className="flex items-center gap-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
          onClick={() => addHeading(3)}>
          <BiHeading size={20} /> H3
        </button>
        <button
          className="flex items-center gap-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
          onClick={addBold}>
          <FaBold size={20} /> Bold
        </button>
        <button
          className="flex items-center gap-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
          onClick={addParagraph}>
          <FaParagraph size={20} /> Paragraph
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="border px-2 rounded text-lg bg-gray-100 shadow-md prose prose-lg max-w-none"
        style={{  maxHeight: '250px', overflowY: 'auto' }}
      />
    </div>
  );
};

export default TiptapEditor;