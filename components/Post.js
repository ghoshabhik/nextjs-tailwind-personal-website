import Link from 'next/link'

export default function Post({ post }) {
  return (
    <div className="flex md:flex-row flex-col m-4 items-center md:justify-start justify-center bg-gray-100 border rounded-r-lg">
      <img src={post.frontmatter.cover_image} alt='' className="w-80 h-full items-center border rounded-l-md"/>
      <div className="px-5 py-3">
        <span className="bg-gray-400 text-sm border rounded-md px-2 text-gray-200">Posted on {post.frontmatter.date}</span>

        <h3 className="text-2xl font-semibold my-2">{post.frontmatter.title}</h3>

        <p className="mb-4">{post.frontmatter.excerpt}</p>
        <Link href={`/blog/${post.slug}`} >
            <a className="">Read More →</a>
        </Link>
      </div>
    </div>
  )
}