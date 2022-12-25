async function clean() {
  const { deleteAsync } = await import('del')
  return await deleteAsync(['./build/'])
}

module.exports = { clean }
