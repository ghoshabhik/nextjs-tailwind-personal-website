import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import marked from 'marked'
import Link from 'next/link'
import ViewCounter from '../../components/ViewCounter'
import Image from 'next/image'

const PostPage = ({frontmatter: { title, date, cover_image, word_count },
  slug,
  content,
  }) => {


  return (
    <>
      
      <div className="lg:w-3/6 mx-auto">
        <div className="flex flex-col items-center my-5">
            <h1 className="mb-3 text-5xl font-semibold text-center">{title}</h1>
            <div className="">
              <span className="bg-gray-500 dark:bg-gray-400 text-sm rounded-md px-2 text-gray-200 dark:text-gray-600 mx-1">{date}</span>
              <span className="bg-gray-500 dark:bg-gray-400 text-sm rounded-md px-2 text-gray-200 dark:text-gray-600 mx-1">{word_count} words</span>
              <span className="bg-gray-500 dark:bg-gray-400 text-sm rounded-md px-2 text-gray-200 dark:text-gray-600 mx-1"><ViewCounter slug={slug}/> views</span>
            </div>
        </div>
        <div className="flex justify-center my-2">
        <Image src={cover_image} alt='Cover Photo' 
        width={800} 
        height={400} className="w-11/12 lg:w-3/4 h-full items-center rounded-xl"/>
        </div>
        <div className="lg:w-3/4 mx-auto px-3 my-5">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }} className="prose dark:prose-dark"></div>
        </div>
        <hr />
        <div className="text-center my-10 ">
        <Link href='/blogs'>
        <a className="text-center bg-gray-800 border rounded-md text-gray-300 px-3">See all other articles</a>
        </Link>
        </div>
      </div>
    </>
  )
}

export default PostPage

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  }
}