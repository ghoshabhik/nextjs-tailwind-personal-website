/* eslint-disable */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import PostList from '../components/PostList'
import TagCloud from '../components/TagCloud'
import { sortByDate } from '../utils'
import Head from 'next/head'
import { useState } from 'react'

const Home = ({ posts }) => {

  const [tag, setTag] = useState("Recent")
  const [filteredPosts, setFilteredPosts] = useState(posts.slice(0,3))
  
  
  const selectedTag = (e) => {
    setTag(e.target.innerText.split(" (")[0])

    if(e.target.innerText.split(" (")[0] != 'All'){
      const filteredPostsByTag = posts.filter( post => post.frontmatter.tags.includes(e.target.innerText.split(" (")[0]))
      setFilteredPosts(filteredPostsByTag)
    } else{
      setFilteredPosts(posts)
    }
  }

  return (
    <>
    <div>
      <Head>
        <title>PaperScripted | A Creative Writing Blog</title>
        <meta name="description" content="PenCel | A Creative Writing Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="lg:w-4/5 w-full mx-auto">
      <div className="flex flex-col items-center justify-center my-5 py-20 space-y-10 px-3 lg:px-60
         text-gray-800 dark:text-gray-100 rounded-md shadow-md">
        <p className="text-6xl font-light">Hello, You!</p>
        <p className="text-left text-lg text-gray-500 dark:text-gray-200">This is home for <span className="font-semibold">PaperScripted</span>, a creative writing blog - to entertain and not often to educate with fiction and non-fiction freestyle writing.</p>
        </div>
      </div>
      <div className="flex flex-col  lg:flex-row lg:justify-between lg:w-4/5 w-full mx-auto my-16 px-3 lg:px-28">
        
        <div className="lg:flex-grow-0">
          <PostList posts={filteredPosts} filter={tag}/>
        </div>
        <div className="lg:flex-grow-0 lg:flex-shrink-0 lg:w-4/12 lg:mt-16 h-full mb-10 lg:mb-1 rounded-md shadow-md">
          <TagCloud posts={posts} selectedTag={selectedTag}/>
        </div>
        
      </div>
      {/* <div className="lg:w-4/5 w-full mx-auto">
      <div class="flex flex-col lg:flex-row items-center justify-center my-5 py-20 space-y-10 lg:px-52
         text-gray-800 rounded-md shadow-md">
        <div >
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
        </div>
      </div> */}
      
    </div>

      
    
    </>
  )
}

export default  Home

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'))

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '')

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }
  })

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  }
}