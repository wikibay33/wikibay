

export default async function CategoryProductsServer({selectedCategory}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Use your actual base URL

    let data = await fetch(`${baseUrl}/api/softwares/get-category/${selectedCategory}`)
    let posts = await data.json()
    return (
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    )
  }