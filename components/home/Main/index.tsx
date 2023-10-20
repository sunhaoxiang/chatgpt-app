import Menu from './Menu'
import Welcome from './Welcome'

export default function Main() {
  return (
    <main className="relative flex-1 overflow-y-auto bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">
      <Menu />
      <Welcome />
    </main>
  )
}
