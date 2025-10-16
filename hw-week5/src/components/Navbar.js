import React from 'react'
import cx from 'classnames'
import {NavLink} from 'react-router-dom'

import Panel from './Panel'

const Navbar = () => {
  const activeClass = 'text-blue-500 font-bold underline'
  const pendingClass = 'text-red-500'

  // using active link styling with NavLink
  return (
    <Panel className="sticky top-0 overflow-y-scroll flex flex-col items-start gap-2 p-2">
      <NavLink
        to="/"
        className={({isActive, isPending}) =>
          cx(isPending && pendingClass, isActive && activeClass, 'text-blue-500')
        }
      >
        Buttons
      </NavLink>

      <NavLink
        to="/accordion"
        className={({isActive, isPending}) =>
          cx(isPending && pendingClass, isActive && activeClass, 'text-blue-500')
        }
      >
        Accordion
      </NavLink>

      <NavLink
        to="/dropdown"
        className={({isActive, isPending}) =>
          cx(isPending && pendingClass, isActive && activeClass, 'text-blue-500')
        }
      >
        Dropdown
      </NavLink>

      <NavLink
        to="/carousel"
        className={({isActive, isPending}) =>
          cx(isPending && pendingClass, isActive && activeClass, 'text-blue-500')
        }
      >
        Carousel
      </NavLink>
    </Panel>
  )


  // previous version without active link styling

  // return (
  //   <Panel className="sticky top-0 overflow-y-scroll flex flex-col item-start">
  //     <Link to="/" className="text-blue-500">
  //       {' '}
  //       Buttons
  //     </Link>
  //     <Link to="/accordion" className="text-blue-500">
  //       Accordion
  //     </Link>
  //     <Link to="/dropdown" className="text-blue-500">
  //       Dropdown
  //     </Link>
  //     {/* Add link to your component page for HW */}
  //     <Link to="/carousel" className="text-blue-500">
  //       Carousel
  //     </Link>
  //   </Panel>
}

export default Navbar
