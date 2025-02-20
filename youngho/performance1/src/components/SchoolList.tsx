import React, { useState, useRef, useEffect } from 'react';
import SchoolItem from './SchoolItem';

const ITEM_HEIGHT = 50; // 각 아이템 높이 (픽셀)
const CONTAINER_HEIGHT = 500; // 리스트 컨테이너 높이
const BUFFER = 5; // 추가 렌더링할 여유 아이템 개수

const SchoolList: React.FC = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ 데이터 로드
  useEffect(() => {
    fetch('/school.json')
      .then((res) => res.json())
      .then((data) => {
        console.log('📌 데이터 개수:', data.data.length);
        setData(data.data);
      })
      .catch((error) => {
        console.error('❌ 데이터 로드 실패:', error);
      });
  }, []);

  // ✅ 전체 리스트 계산
  const totalItems = data.length;
  const totalHeight = totalItems * ITEM_HEIGHT;
  const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);
  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);
  const endIndex = Math.min(
    totalItems - 1,
    startIndex + visibleCount + BUFFER * 2
  );
  const visibleItems = data.slice(startIndex, endIndex + 1);

  // ✅ 스크롤 이벤트 등록
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        console.log('🔹 스크롤 위치 변경됨:', containerRef.current.scrollTop);
        setScrollTop(containerRef.current.scrollTop);
      }
    };

    const container = containerRef.current;

    if (!container) {
      console.error(
        '❌ containerRef가 null입니다. DOM에 정상적으로 연결되었는지 확인하세요.'
      );
      return;
    }

    console.log('✅ 스크롤 이벤트가 정상적으로 등록되었습니다.');
    container.addEventListener('scroll', handleScroll);

    return () => {
      console.log('⏳ 스크롤 이벤트 해제');
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ✅ scrollTop 상태 변경 시 로그 확인
  useEffect(() => {
    console.log('📌 현재 scrollTop 값:', scrollTop);
  }, [scrollTop]);

  return (
    <div
      ref={containerRef}
      className="w-full border rounded-lg overflow-auto bg-gray-100"
      style={{ height: CONTAINER_HEIGHT, overflowY: 'auto' }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((school, index) => (
          <SchoolItem
            key={school.id}
            name={school.name}
            style={{
              position: 'absolute',
              top: (startIndex + index) * ITEM_HEIGHT,
              width: '100%',
              height: ITEM_HEIGHT,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SchoolList;
