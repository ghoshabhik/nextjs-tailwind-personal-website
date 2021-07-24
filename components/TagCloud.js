import Link from 'next/link'

export default function TagCloud({ posts, selectedTag }) {

  var tagList = []
  posts.map(post => {
    post.frontmatter.tags.map(tag => {
        tagList.push(tag)
    })
  })
  var flattenTags = new Map();
  tagList.forEach( tag => {
    flattenTags.has(tag) ? flattenTags.set(tag, flattenTags.get("tag2")+1) : flattenTags.set(tag, 1)
  })

  const tagsArr = Array.from(flattenTags.entries())

  return (
    <div className="my-2">
        <p className="text-center text-xl font-semibold mb-4">Tags</p>
        <div className="flex flex-wrap px-2">
            <p className=" px-2 py-1 m-1 rounded-md shadow-md text-center text-sm cursor-pointer" onClick={(e) => selectedTag(e)}>
                    All ({posts.length})
            </p>
            {tagsArr.map((tag, index) => (
                <p className=" px-2 py-1 m-1 rounded-md shadow-md sha text-center text-sm cursor-pointer" key={index} onClick={(e) => selectedTag(e)}>
                    {tag[0]} ({tag[1]})
                </p>
            ))}
        </div>
    </div>
  )
}