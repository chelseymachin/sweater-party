export interface RavelryUser {
  about_me_html: string
  about_me: string
  fave_colors: string
  fave_curse: string
  first_name: string
  id: string
  large_photo_url: string
  location: string
  pattern_author: string
  photo_url: string
  small_photo_url: string
  tiny_photo_url: string
  user_sites: string
  username: string
}

export interface RavelryProject {
  completed: string
  completed_day_set: boolean
  craft_name: string
  created_at: string
  first_photo: string
  gauge: string
  id: number
  links: {
    self: {
      href: string
    }
  }
  name: string
  pattern_id: number
  pattern_name: string
  photos_count: number
  size: string
  started: string
  status_name: string
}

export interface RavelryProjectList {
  projects: RavelryProject[]
}
