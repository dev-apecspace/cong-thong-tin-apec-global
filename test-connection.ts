import { createClient } from '@/lib/supabase-client'

async function testConnection() {
  const supabase = createClient()
  
  // Test 1: Lấy các tables
  console.log('Testing Supabase connection...')
  
  try {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .limit(1)
    
    console.log('Data:', data)
    console.log('Error:', error)
    
    if (error) {
      console.error('Query error:', error.message, error.code)
    }
  } catch (e) {
    console.error('Connection error:', e)
  }
}

testConnection()
