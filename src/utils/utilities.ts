export const fetchUserData = async () => {
  try {
    const response = await fetch('', {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('❌ Failed to fetch user data:', await response.json())
      return null
    }

    const data = await response.json()
    console.log('✅ User data fetched successfully:', data)
    return data
  } catch (error) {
    console.error('❌ Error fetching user data:', error)
    return null
  }
}
