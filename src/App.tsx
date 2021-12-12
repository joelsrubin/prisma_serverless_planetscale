import { useEffect, useState, FormEvent } from 'react';

import './App.css';

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);

  async function load() {
    const posts = await fetch('/.netlify/functions/posts').then((res) =>
      res.json()
    );
    setPosts(posts);
  }

  useEffect(() => {
    load();
  }, []);

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const post = {
      title,
      content,
    };
    await fetch('/.netlify/functions/post', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      setTitle('');
      setContent('');
      load();
    });
  }

  return (
    <>
      <div className='App'>
        <h1>My Posts</h1>
        <ul>
          {posts.length > 0 ? (
            posts
              .filter((post) => Boolean(post.content))
              .map((post) => (
                <li key={post.id}>
                  <h3>{post.title}</h3>
                  <p> Created {new Date(post.createdAt).toLocaleString()}</p>
                  <p>{post.content}</p>
                </li>
              ))
          ) : (
            <div>no posts loaded</div>
          )}
        </ul>
      </div>
      <div className='container'>
        <form onSubmit={submitHandler}>
          <h4>Create a Post</h4>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor='content'>Content</label>
          <input
            type='text'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
