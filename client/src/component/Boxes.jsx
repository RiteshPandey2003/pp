import React, { useRef } from 'react';

const Boxes = () => {
  const containerRef = useRef(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 400; // Adjust the value based on your box width
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 400; // Adjust the value based on your box width
    }
  };

  return (
    <div className='relative'>
      <div className='flex p-4 overflow-x-scroll' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} ref={containerRef}>
        <div className='bg-purple-200 p-4 rounded-lg shadow-lg mr-4' style={{ minWidth: '400px' }}>
          {/* Content for Box 1 */}1
        </div>
        <div className='bg-purple-200 p-4 rounded-lg shadow-lg mr-4' style={{ minWidth: '400px' }}>
          {/* Content for Box 1 */}2
        </div>
        <div className='bg-purple-200 p-4 rounded-lg shadow-lg mr-4' style={{ minWidth: '400px' }}>
          {/* Content for Box 1 */}3
        </div>
        <div className='bg-purple-200 p-4 rounded-lg shadow-lg mr-4' style={{ minWidth: '400px' }}>
          {/* Content for Box 1 */}4
        </div>
        <div className='bg-purple-200 p-4 rounded-lg shadow-lg mr-4' style={{ minWidth: '400px' }}>
          {/* Content for Box 1 */}5
        </div>
        <div className='bg-purple-200 p-4 rounded-lg shadow-lg mr-4' style={{ minWidth: '400px' }}>
          {/* Content for Box 1 */}6
        </div>
      </div>
      <button className='absolute top-1/2 transform -translate-y-1/2 left-2' onClick={scrollLeft}>
        Prev
      </button>
      <button className='absolute top-1/2 transform -translate-y-1/2 right-2' onClick={scrollRight}>
        Next
      </button>
    </div>
  );
}

export default Boxes;
