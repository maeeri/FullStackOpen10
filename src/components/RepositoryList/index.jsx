import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../../hooks/useRepositories'
import { useNavigate } from 'react-router-native'
import { SelectInput } from '../FormikSelectInput'
import { Searchbar } from 'react-native-paper'
import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'

const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
})

export const ItemSeparator = () => <View style={styles.separator} />

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { onChangeSearch, searchQuery, selectOptions, handleChange } =
      this.props

    return (
      <>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <SelectInput
          options={selectOptions}
          handleChange={handleChange}
          initialValue="select an item..."
        />
      </>
    )
  }

  render() {
    const { repositories, navigate, onEndReach } = this.props

    const handlePress = (item) => {
      navigate(`/${item.id}`, { replace: true })
    }

    // Get the nodes from the edges array
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : []

      // console.log(repositoryNodes.length)

    return (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        // onEndReachedThreshold={0}
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
      />
    )
  }
}

const RepositoryList = () => {
  const { repositories, fetchMore, refetch } = useRepositories({
    first: 6,
  })
  const [query, setQuery] = useState('')
  const [searchKeyword] = useDebounce(query, 500)
  const navigate = useNavigate()

  const selectOptions = [
    'Latest repositories',
    'Highest rated repositories',
    'Lowest rated repositories',
  ]

  const handleChange = (value) => {
    const orderBy =
      value === 'Latest repositories' ? 'CREATED_AT' : 'RATING_AVERAGE'
    const orderDirection =
      value === 'Lowest rated repositories' ? 'ASC' : 'DESC'

    refetch({ orderBy, orderDirection })
  }

  const handleSearchChange = (value) => {
    setQuery(value)
    refetch({ searchKeyword })
  }

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <>
      <RepositoryListContainer
        repositories={repositories}
        onEndReach={onEndReach}
        onChangeSearch={handleSearchChange}
        selectOptions={selectOptions}
        handleChange={handleChange}
        navigate={navigate}
      />
    </>
  )
}

export default RepositoryList
