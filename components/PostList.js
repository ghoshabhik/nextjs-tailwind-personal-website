import Link from 'next/link'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'

export default function PostList({ posts, filter }) {

  const { data, error } = useSWR('/api/views', fetcher)

  data?.data.map( article => {
    posts.map((post,index) => {
      if(post.slug === article.slug){
        posts[index].count = article.count
      }
    })
  })
  // console.log(posts)
  return (
    <div className="my-3">
        <p className="text-5xl">{filter === 'Recent' ? 'Recent Blogs' : `Showing ${filter} tags` } </p>
        <div>
        {posts.map((post, index) => (
          <div className="py-3 my-4" key={index}>
            <Link href={`/blog/${post.slug}`} >
            <a className="">
              
              <h3 className="text-3xl font-semibold my-2">{post.frontmatter.title}</h3>
              <div className="flex flex-row items-center justify-start">
                <p className=" text-sm text-gray-600 dark:text-gray-300">📅&nbsp; {post.frontmatter.date} &nbsp;&nbsp; </p>
                <h3 className="text-gray-400 dark:text-gray-300 text-sm">📃&nbsp;{post.count > 0 ? post.count : '0'} views</h3>
              </div>
              {post.frontmatter.tags.map((tag,index) => (
                <span className=" text-sm text-gray-600 dark:text-gray-300 " key={index}>{tag} {index+1 < post.frontmatter.tags.length ? " | " : ""}</span>
              ))}
              
      
              <p className="mb-4 text-gray-500 dark:text-gray-200 ">{post.frontmatter.excerpt}</p>
            </a>
            </Link>
          </div>
        ))}
        </div>
    </div>
  )
}