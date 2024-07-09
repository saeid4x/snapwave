import { Models } from 'appwrite'
import React from 'react'
import Loader from './Loader'
import GridPostList from './GridPostList'

type SearchResultsProps ={
  isSearchFetching: boolean,
  searchedPosts: Models.Document[]
}
const SearchResults = ({isSearchFetching,searchedPosts} : SearchResultsProps ) => {

  if(isSearchFetching) return <Loader />
  
    console.log('searchedPosts',searchedPosts)
  // @ts-ignore
  if(searchedPosts && searchedPosts.documents.length > 0){
    return (
      // @ts-ignore
      <GridPostList posts={searchedPosts.documents} />
    )
  }
  return (
    <p className='text-light-4 mt-10 text-center w-full '>No Result Found</p>
  )
}

export default SearchResults