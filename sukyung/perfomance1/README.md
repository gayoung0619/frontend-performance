# sukyung 작업

## 2월 첫째주 성능 최적화 과제 : 가상 스크롤

### 1. 문제 상황

학교를 선택하는 셀렉박스 컴포넌트를 렌더링하는데, 학교 목록이 10만개가 넘어갔다.
10만개가 넘는 학교 이름을 전부 렌더링하는 것은 성능상 효율적이지 못하다고 판단했다.
lighthouse로 성능을 측정했을때 아래와 같은 점수가 나왔다.
<img width="1354" alt="스크린샷 2025-02-08 오후 12 54 48" src="https://github.com/user-attachments/assets/1edd9c79-b559-431f-a5a1-51ee124d8ac8" />

### 2. 문제 해결

#### 2-1. 가상 스크롤 적용

모든 데이터를 렌더링하는 것이 아닌, 화면에 보이는 부분만큼 렌더링한다.
스크롤시 자연스럽게 전후 데이터들이 보여지기 위해서는 앞뒤로 5개 정도 미리 렌더링을 해두었다.

우선, 학교 목록을 감싸는 태그에 미리 높이값을 지정해준다. (참고로, 학교 이름을 담고 있는 아이템은 높이값이 20px로 고정했다.)
`20px * 학교 목록의 갯수`

화면에 보여질 갯수 + 앞뒤 5개 정도가 보여져야 할텐데, 학교 목록에서 어디서부터 어디까지 렌더링할건지 정하는 startIdx와 endIdx는 스크롤된 크기에 따라 정해진다.

```
const startIdx = Math.max(0, Math.floor(scrollTop / 20) - 5); // startIdx는 총 학교 목록의 인덱스가 0부터 존재하니 0보다 작아질 수 없다.
const endIdx = Math.min(
totalItems - 1,
Math.ceil((scrollTop + CONTAINER_HEIGHT) / 20) + 5
); // 스크롤된 크기를 통해 구한 endIdx는 총 학교 목록의 갯수보다 더 커질 수 없다

const visibleItems = [];
for (let i = startIdx; i <= endIdx; i++) {
visibleItems.push({
index: i,
top: i \* 20,
});
}

...
return
...
{visibleItems.map(({ index, top }) => (

  <div
    key={schoolList?.data[index].id}
    className="item_list"
    style={{
      position: 'absolute',
      top,
      height: '20px',
      width: '100%',
    }}
  >
    {schoolList?.data[index].name}
  </div>
))}
...
```

#### 2-2. 가상 스크롤 적용의 결과

: 점수가 2배 올랐다. 그러나, FCP와 LCP 점수가 현저히 낮다는 문제가 있었다.
<img width="763" alt="스크린샷 2025-02-09 오후 3 50 35" src="https://github.com/user-attachments/assets/16353c25-f825-41d8-948b-9597982e9c2c" />

#### 2-3. FCP, LCP 개선

FCP, LCP 개선시키기 위해서

1. 스켈레톤 적용

2. throttle 적용

두 가지 방법을 사용해봤지만 점수는 그대로 였고 오히려 FCP, LCP 시간이 미세하게 늘어났었다.

#### 2-4. FCP, LCP 점수 해결

: FCP, LCP 개선시키기 위해서 항상 제일 먼저 나오는 해결법은 js 파일과 css 파일을 압축하고 경량화시키는 것이다.
지금까지 성능 점수를 확인한건 빌드된 파일로 확인한게 아니기 때문에 FCP, LCP를 개선시킬 수 없다고 판단했고 빌드된 파일로 측정해야겠다고 생각했다.
그 결과, 크게 개선된 점수를 받을 수 있었다.
<img width="802" alt="스크린샷 2025-02-10 오후 7 22 12" src="https://github.com/user-attachments/assets/848d723d-9e19-4248-bd84-6bda52e42e12" />

또한, 어떤 블로그에서 시크릿 모드에서 빌드된 것으로 실행시켜야 한다는 글을 찾았다. [참고한 블로그](https://always-hyeppy.tistory.com/entry/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%84%B1%EB%8A%A5CLS-LCP-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0)

#### 3. 추가 코드 개선 작업

스크롤 이벤트가 발생할때마다 컴포넌트가 재렌더링이 되는데,
이때마다 값이 거의 바뀔 일이 없는 변수나 새로운 함수가 재생성하지 않도록 useMemo와 useCallback 함수를 사용해보았다.

#### 4. 스터디 후 알게 된 점, 느낀 점

1. 내가 작업한 방식은 데이터의 크기를 요소의 높이값으로 직접 적용하여 스크롤이 데이터 양에 비례하도록 구현했는데, 이러한 방식이 렌더링 성능에 부담을 줄 수 있다는 것을 알게 되었다.
   예: `<div style="height: 2.92822e+06px; position: relative;"> <-- 내용 --> </div>`

이러한 방식보다 데이터 크기를 사용하여 이에 비례한 스크롤 모양을 만드는 것이 렌더링에 덜 부담이 된다는 것을 알게 되었다.
예:

```
const Scroll = ({ height, position }: ScrollProps) => { // 여기서 height은 useScroll이라는 커스텀 훅에서 전체 데이터 크기분의 아이템의 크기만큼의 비율을 가지고 높이를 지정한다. 따라서 높이값이 규모 있는 숫자가 되지 않는다.
return (
  <div className={style['scroll-container']}>
    <div
      className={style.scroll}
      style={{
        height: `${Math.max(height, 10)}px`,
        top: `${position}px`
      }}
    />
  </div>
)
```

};

2. 다른 팀원분이 가상 스크롤 자체를 커스텀훅으로 만든 것을 보았다. 커스텀훅을 만들어 놓는다면 다른 컴포넌트에서도 재사용할 수도 있을 것이다. 나도 앞으로 재사용이 가능한 컴포넌트로 만들려고 의식적으로 생각해봐야겠다.
