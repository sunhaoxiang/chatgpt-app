import Example from './Example'
import ModelSelect from './ModelSelect'

export default function Welcome() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-20">
      <ModelSelect />
      <h1 className="mt-20 text-4xl font-bold">ChatGPT</h1>
      <Example />
    </div>
  )
}
