import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'admin' | 'manager' | 'staff'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          role?: 'admin' | 'manager' | 'staff'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'admin' | 'manager' | 'staff'
          created_at?: string
          updated_at?: string
        }
      }
      menu_items: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          category: string
          image_url: string
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          category: string
          image_url?: string
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          category?: string
          image_url?: string
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      tables: {
        Row: {
          id: string
          table_number: number
          capacity: number
          status: 'available' | 'occupied' | 'reserved' | 'maintenance'
          location: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          table_number: number
          capacity: number
          status?: 'available' | 'occupied' | 'reserved' | 'maintenance'
          location: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          table_number?: number
          capacity?: number
          status?: 'available' | 'occupied' | 'reserved' | 'maintenance'
          location?: string
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          table_id: string
          staff_id: string
          status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed'
          total_amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          table_id: string
          staff_id: string
          status?: 'pending' | 'preparing' | 'ready' | 'served' | 'completed'
          total_amount: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          table_id?: string
          staff_id?: string
          status?: 'pending' | 'preparing' | 'ready' | 'served' | 'completed'
          total_amount?: number
          created_at?: string
          updated_at?: string
        }
      }
      reservations: {
        Row: {
          id: string
          table_id: string
          customer_name: string
          customer_phone: string
          customer_email: string
          party_size: number
          reservation_date: string
          reservation_time: string
          status: 'confirmed' | 'cancelled' | 'completed'
          notes: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          table_id: string
          customer_name: string
          customer_phone: string
          customer_email?: string
          party_size: number
          reservation_date: string
          reservation_time: string
          status?: 'confirmed' | 'cancelled' | 'completed'
          notes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          table_id?: string
          customer_name?: string
          customer_phone?: string
          customer_email?: string
          party_size?: number
          reservation_date?: string
          reservation_time?: string
          status?: 'confirmed' | 'cancelled' | 'completed'
          notes?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}