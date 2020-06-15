import { gql } from 'apollo-boost';

export const pastSearchQuery = gql`
  query PastSearch($sub: String!){
    pastSearches(sub: $sub) {
      keyword
      radius
      timestamp
    }
  }
`

export const placesQuery = gql `
  query Places($sub: String!, $query: String!, $radius: Int!, $latlng: LatLngInput!) {
    places(sub: $sub, query: $query, radius: $radius, latlng: $latlng) {
      id
      formatted_address
      name
      geometry {
        location {
          lat
          lng
        }
      }
    }
  }
`