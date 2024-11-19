'use client'
import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Tiptap from './Tiptap';

const BlogForm = ({setShowForm}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    immediatelyRender: false
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const blogData = {
      title,
      content,
      author
    };

    try {
      const response = await fetch('/api/blogs/add-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogData)
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess('Blog added successfully!');
        setTitle('');
        setContent('');
        setAuthor('');
        setShowForm('All-blogs')
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('An error occurred while adding the blog.');
    }
  };

  return (
    <div className="flex flex-col justify-start items-center min-h-[80vh] bg-white "> 
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit} className='w-full max-w-screen-lg p-8 gap-8'>
        <h1 className='text-2xl font-bold mb-8'>Add Blog</h1>
        <div className='lg:flex gap-4'>
        <div className="w-full max-w-screen-lg mb-4 ">
          <label htmlFor="title text-white">Title</label>
          <input
          className="form-control mt-2 block w-full rounded-md border-b-2 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black p-2 bg-gray-200"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="w-full max-w-screen-lg mb-4 ">
          <label htmlFor="author text-white">Author</label>
          <input
          className="form-control mt-2 block w-full rounded-md border-b-2 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black p-2 bg-gray-200"
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        </div>
        <div className="w-full mb-3">
          <label htmlFor="content text-white">Content</label>
          {/* <textarea
          className="form-control mt-4 block w-full rounded-md border-b-2 border-black shadow-sm focus:border-indigo-300 h-24 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black p-2 bg-gray-200"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea> */}
           <Tiptap content={content} setContent={setContent} />
           {/* <div className='text-lg bg-gray-100 shadow-md rounded-lg p-4  prose prose-lg max-w-none'>
        {parse(content)}
      </div> */}
      {/* <textarea 
        value={content} 
        readOnly 
        rows="10" 
        cols="80" 
        style={{ marginTop: '20px', width: '100%' }}
        className='porse porse-lg'
      /> */}
        </div>
        <button type="submit" className="btn btn-block btn-primary py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full mt-4" >Add Blog</button>
      </form>
    </div>
  );
};

export default BlogForm;



