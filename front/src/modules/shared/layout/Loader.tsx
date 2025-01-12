import { ComponentType, Suspense } from 'react'

export const Loader =
  (Component: React.LazyExoticComponent<ComponentType>): ((props: object) => JSX.Element) =>
  (props: object) =>
    (
      <Suspense
        fallback={
          <div className='flex justify-center items-center w-full h-[90vh]'>
            <div className='loader'></div>
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
      )