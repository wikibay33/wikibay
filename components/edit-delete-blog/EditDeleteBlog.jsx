'use client'
import React, { useState } from 'react';
import { FilePenLine, Trash2 } from 'lucide-react';
import Modal from '../modal/Modal';
import { useRouter } from 'next/navigation';
import Tiptap from '../blogForm/Tiptap';
import { useUser } from '@clerk/nextjs';

export default function EditDeleteBlog({ blog, onBlogUpdate, onBlogDelete }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [title, setTitle] = useState(blog.title);
  const [author, setAuthor] = useState(blog.author);
  const [content, setContent] = useState(blog.content);
  const router = useRouter();
  const user = useUser();

  const handleUpdate = async () => {
    const updatedBlog = { ...blog, title, author, content };

    // Optimistically update the UI
    onBlogUpdate(updatedBlog);

    const response = await fetch(`/api/blogs/update-blog/${blog._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author, content }),
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
        confirmText="مسح"
        cancelText="الغاء"
      >
        <div className='h-1/2-screen'>
          <p className='text-black'>هل انت متأكد؟ </p>
        </div>
      </Modal>

      <Modal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onConfirm={handleUpdate}
        confirmText="تعديل"
        cancelText="الغاء"
      >
        <div className='flex flex-col gap-4 text-black'>
          <label>
            العنوان:
          </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border p-2 rounded'
          />
          <label>
            الكاتب:
          </label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border p-2 rounded'
          />
          <label>
            المحتوى:
          </label>
          <Tiptap content={content} setContent={setContent} />
        </div>
      </Modal>
    </div>
  );
}
