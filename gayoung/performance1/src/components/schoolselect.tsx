import React, {useEffect, useRef, useState} from "react";
import { useQuery } from "@tanstack/react-query";
import {getSchoolList} from "../api/school";
import styled from "styled-components";
import { useWindowScroll, useWindowSize } from "react-use";

const SchoolSelector = () => {
  const itemHeight = 100;
  const columnGap = 10;
  const { height } = useWindowSize();
  const { y } = useWindowScroll();

  const { data: schoolList, isLoading } = useQuery({
    queryKey: ["schoolList"],
    queryFn: () => getSchoolList(),
    staleTime: 24 * 60 * 60 * 1000,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [viewportY, setViewportY] = useState(0);

  const relativeY = y - viewportY;

  useEffect(() => {
    if (scrollRef.current) {
      const viewportY = scrollRef.current.getBoundingClientRect().y;
      setViewportY(viewportY);
    }
  }, []);

  const containerHeight = (itemHeight + columnGap) * schoolList?.data.length
  const startIndex = Math.max(
      Math.floor(relativeY / (itemHeight + columnGap)), 0
  )
  const endIndex = Math.min(
      Math.ceil(height / (itemHeight + columnGap) + startIndex), schoolList?.data.length
  )
  const visibleItem = schoolList?.data.slice(
      Math.max(startIndex, 0),
      Math.min(endIndex + 1, schoolList?.data.length)
  )
  const translateY = Math.max((itemHeight + columnGap) * startIndex, columnGap);

  return (
      <div>
        {isLoading ? (
            <p>Loading...</p>
        ) : (
            <SchoolList ref={scrollRef} style={{height: `${containerHeight}px`}}>
              <div style={{ transform : `translateY(${translateY}px)` }}>
                {visibleItem?.map((ele, idx) => (
                    <div
                        key={idx}
                        style={{
                          height: `${itemHeight}px`,
                          lineHeight: `${itemHeight}px`,
                          marginTop: `${columnGap}px`,
                          background: "#F1F1F1",
                          textAlign: "center"
                        }}
                    >
                      {ele.name}
                    </div>
                ))}
              </div>
            </SchoolList>

        )}
      </div>
  );
};
const SchoolList = styled.div`
    > div {
        height: auto;
    }
`
export default SchoolSelector;
