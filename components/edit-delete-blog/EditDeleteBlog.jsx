'use client'
import React, { useState } from 'react';
import { FilePenLine, Trash2 } from 'lucide-react';
import Modal from '../modal/Modal';
import { useRouter } from 'next/navigation';
import Tiptap from '../blogForm/Tiptap';
import { useUser } from '@clerk/nextjs';
import MDEditor from '@uiw/react-md-editor';

export default function EditDeleteBlog({ blog, onBlogUpdate, onBlogDelete }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [title, setTitle] = useState(blog.title);
  const [author, setAuthor] = useState(blog.author);
  const [content, setContent] = useState(blog.content);
  const router = useRouter();
  const user = useUser();
  const [image, setImage] = useState(blog.image);

  const handleUpdate = async () => {
    const updatedBlog = { ...blog, title, author, content };

    // Optimistically update the UI
    onBlogUpdate(updatedBlog);

    const response = await fetch(`/api/blogs/update-blog/${blog._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author, content, image }),
    });

    if (response.ok) {
      setShowUpdateModal(false);
    } else {
      alert('Failed to update the blog');
      // Optionally, revert the optimistic update if needed
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/blogs/delete-blog/${blog._id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setShowDeleteModal(false);
      // Call the onBlogDelete function to remove the blog from the state
      onBlogDelete(blog._id);
    } else {
      alert('Failed to delete the blog');
    }
  };

  return (
    <div className='flex gap-4'>
      {user.user?.publicMetadata.role && (
        <>
          <button onClick={() => setShowUpdateModal(true)}>
            <FilePenLine />
          </button>
          <button onClick={() => setShowDeleteModal(true)}>
            <Trash2 />
          </button>
        </>
      )}
      <Modal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        confirmText="delete"
        cancelText="cancel"
      >
        <div className='h-1/2-screen'>
          <p className='text-black'>Are you sure? </p>
        </div>
      </Modal>

      <Modal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onConfirm={handleUpdate}
        confirmText="update"
        cancelText="cancel"
      >
        <div className='flex flex-col gap-4 text-black'>
          <label>
            title:
          </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control block w-full rounded-md border-b-2 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black p-2 bg-gray-200"
            />

<label htmlFor="title text-white">Image Url</label>
<input
className="form-control block w-full rounded-md border-b-2 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black p-2 bg-gray-200"
  type="text"
  id="image"
  value={image}
  onChange={(e) => setImage(e.target.value)}
  required
/>
          <label>
            Author:
          </label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-control block w-full rounded-md border-b-2 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black p-2 bg-gray-200"
            />
          <label htmlFor="content text-white">Content</label>
          <MDEditor
          value={content}
          onChange={(value) => setContent(value)}
          id="content"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        </div>
      </Modal>
    </div>
  );
}
