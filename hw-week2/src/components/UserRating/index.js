import {useState} from 'react'
import {ReactComponent as Favorite} from '@material-design-icons/svg/filled/favorite.svg';

export const UserRating = () => {
    const [count, setCount] = useState(0)

    const handlePlusClick = () => {
        if (count >= 5) return
        setCount(count + 1)
        // conditional rendering - make button disappear when count is 5
    }

    const handleMinusClick = () => {
        if (count <= 0) return
        setCount(count - 1)
        // conditional rendering - make button disappear when count is 0
    }

    return (
        <div>
            {/* First line: count + hearts */}
            <div>
                {count}

                <Favorite />
                {[...Array(Math.max(count - 1, 0))].map((heart, index) => {
                    return <span key={index}> <Favorite /></span>
                })}
            </div>

            {/* Second line: buttons */}
            <div>
                <button
                    style={{ visibility: count > 0 ? 'visible' : 'hidden' }}
                    onClick={handleMinusClick}
                >
                    [-]
                </button>

                <button
                    style={{ visibility: count < 5 ? 'visible' : 'hidden' }}
                    onClick={handlePlusClick}
                >
                    [+]
                </button>
            </div>
        </div>
    )
}

export default UserRating