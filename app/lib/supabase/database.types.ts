export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bio_pages: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          slug: string
          theme: Json
          blocks: Json
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          slug: string
          theme?: Json
          blocks?: Json
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          slug?: string
          theme?: Json
          blocks?: Json
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      links: {
        Row: {
          id: string
          bio_page_id: string
          title: string
          url: string
          icon_url: string | null
          order: number
          created_at: string
        }
        Insert: {
          id?: string
          bio_page_id: string
          title: string
          url: string
          icon_url?: string | null
          order?: number
          created_at?: string
        }
        Update: {
          id?: string
          bio_page_id?: string
          title?: string
          url?: string
          icon_url?: string | null
          order?: number
          created_at?: string
        }
      }
      images: {
        Row: {
          id: string
          bio_page_id: string
          storage_path: string
          url: string
          type: 'avatar' | 'background' | 'content'
          created_at: string
        }
        Insert: {
          id?: string
          bio_page_id: string
          storage_path: string
          url: string
          type: 'avatar' | 'background' | 'content'
          created_at?: string
        }
        Update: {
          id?: string
          bio_page_id?: string
          storage_path?: string
          url?: string
          type?: 'avatar' | 'background' | 'content'
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}




