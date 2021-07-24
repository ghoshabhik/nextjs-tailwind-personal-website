import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sortByDate } from '../utils'
import SearchBox from '../components/SearchBox'
import PostList from '../components/PostList'
import TagCloud from '../components/TagCloud'
import Head from 'next/head'
import { useState } from 'react'


export default function Blogs({ posts }) {

    const [searchTerm, setSearchTerm] = useState("")
    const [tag, setTag] = useState("All")
    const [filteredPosts, setFilteredPosts] = useState(posts)

    const handleType = e => {
        if(e.target.value.length > 2){
            setSearchTerm(e.target.value)
            const filteredPostsByTag = posts.filter( post => post.frontmatter.title.toLowerCase().includes(e.target.value.toLowerCase()))
            setTag("All")
            setFilteredPosts(filteredPostsByTag)
        } else {
            const filteredPostsByTag = posts
            setTag("All")
            setFilteredPosts(filteredPostsByTag)
            setSearchTerm("")
        }
    }

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
            <Head>
            <title>PaperScripted | A Creative Writing Blog</title>
            <meta name="description" content="PenCel | All Articles" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="lg:w-2/5 w-full mx-auto my-3 py-10 px-4 lg:px-0">
            <p className="text-5xl mb-4">Blog</p>
            <p className="text-gray-700 dark:text-gray-200 my-8">Most of my online writing begun back in 2017. I like to deconstruct common believes, ideas and find the interestingness in them - this often gives a new perspective to the world.
             There are {posts.length} blog articles in here. Please use the below search box to filter by title</p>
             
            <SearchBox handleType={handleType} />

            <div className="flex flex-col  lg:justify-between my-16">
                <div className="lg:flex-grow-0">
                <PostList posts={filteredPosts} filter={tag}/>
                </div>
                <div className="mb-10 lg:mb-1 rounded-md shadow-md">
                <TagCloud posts={posts} selectedTag={selectedTag}/>
                </div>
            </div>
            </div>
        </>
        
    )
  }

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