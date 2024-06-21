import './list.scss'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ListItem from '../listItem/ListItem';
import { useRef, useState, useEffect } from 'react';

export default function List({list}) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 235);
  const [itemWidth, setItemWidth] = useState(235);
  

  const listRef = useRef();

  const updateDimensions = () => {

    if(window.innerWidth > 930){
      setClickLimit(window.innerWidth / 325);
      setItemWidth(400)
    } else if (window.innerWidth > 480){  
      setItemWidth(265)
    }else{
      setItemWidth(235)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;

    if(direction === 'left' && slideNumber > 0){
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${itemWidth+distance}px)`

    }

    if(direction === 'right' && slideNumber<5 - clickLimit){
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-itemWidth+distance}px)`

    }
    console.log(distance)
  }

  return (
    <div className='list'>
        <div className="listTitle">{list.title}</div>
        <div className="wrapper">
          <ArrowBackIosNewOutlinedIcon className='sliderArrow left' 
            onClick={()=>handleClick("left")} 
            style={{ display: ( !isMoved || slideNumber === 0) ? 'none' : 'block' }}

          />
          <div className="container" ref={listRef}>
              
              {list.content.map((item,i) => (
                <ListItem key={i} index={i} item={item}/>
              ))}

          </div>
          <ArrowForwardIosOutlinedIcon className='sliderArrow right' onClick={()=>handleClick("right")}
          
            />

        </div>
    </div>
  )
}
