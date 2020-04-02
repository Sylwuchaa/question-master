import React, { useEffect, useState, ChangeEvent } from 'react'
import {
  Label,
  SelectInput,
  SelectInputContainer,
} from '../../../styled/components/GlobalComponents'

const baseURL = 'https://opentdb.com/api_category.php'

type DataObject = {
  id: string
  name: string
}

type Data = DataObject[]

interface SelectCategory {
  handleOnChangeCategory: (event: ChangeEvent<HTMLSelectElement>) => void
  categoryValue: string
}

export const SelectCategory: React.FC<SelectCategory> = ({
  handleOnChangeCategory,
  categoryValue,
}) => {
  const [categories, getCategoriesType] = useState<Data>()
  const [loading, setStatus] = useState<boolean>(true)
  useEffect(() => {
    getCategory()
  }, [])

  const getCategory = async () => {
    try {
      const response = await fetch(baseURL)
      const categoryData = await response.json()
      getCategoriesType(categoryData.trivia_categories)

      return getCategoriesType(categoryData.trivia_categories), setStatus(false)
    } catch (err) {
      console.log(err)
    }
  }

  const renderCategoryList = () => {
    if (categories != null) {
      return categories.map((category: DataObject) => (
        <option key={category.id + category.name} value={category.id}>
          {category.name}
        </option>
      ))
    }
  }

  return (
    <>
      <Label htmlFor="selectCategory">Select Category:</Label>
      <SelectInputContainer className={loading ? 'select is-info is-loading' : 'select is-info'}>
        <SelectInput
          id="selectCategory"
          onChange={handleOnChangeCategory}
          value={categoryValue}
          name="selectedCategory"
        >
          <option>Any Category</option>
          {renderCategoryList()}
        </SelectInput>
      </SelectInputContainer>
    </>
  )
}
