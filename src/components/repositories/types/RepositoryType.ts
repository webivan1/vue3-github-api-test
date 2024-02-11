export type OwnerType = {
  login: string
  id: number
  avatar_url: string
  html_url: string
}

export type LicenseType = {
  key: string
  name: string
  spdx_id: string
  url: string
}

export type RepositoryType = {
  id: number
  name: string
  full_name: string
  private: boolean
  owner: OwnerType
  license: LicenseType
  html_url: string
  description: string
  updated_at: string
  homepage: string
  watchers_count: number
  stargazers_count: number
  archived: boolean
  disabled: boolean
  open_issues_count: number
  topics: string[]
  score: number
}

export type RepositoryResponseType = {
  total_count: number
  incomplete_results: boolean
  items: RepositoryType[]
}
