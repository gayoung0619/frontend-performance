# 2월 첫째주 성능 최적화 과제 : 이미지 최적화

## 1. 문제 상황

이미지 리스트에서 각각의 이미지들은 고해상도이며 5000 × 5000 크기를 갖고 있다.
이로 인해 LCP와 TBT가 에러가 날 정도로 성능에 문제가 있었다.
![](https://velog.velcdn.com/images/oaksusu/post/5469a1ed-a627-44f8-806f-d2e175cf2e42/image.png)

## 2. 문제 해결 과정

### 2-1. 이미지 압축

: 이미지 압축시켜주는 사이트에서 압축시켜서 용량을 7% 줄였지만(2.33 MB -> 2.17 MB)
lighthouse에서 측정한 성능 점수는 동일하며, LCP와 TBT를 개선시키지 못했다.

### 2-2. 확장자 변환

기존 이미지는 jpg였으나, webp로 변환하여 성능 측정결과 speed index는 0.1s 줄었지만 나머지는 변화가 없었다.

### 2-3. 기존의 LCP 개선

구글링을 통해 읽은 글에서 앞서 적용해보았던 방법들인, 이미지 압축과 이미지 확장자를 바꿔보는 방법은 기존의 개선 방법이며, 실제로 성능을 크게 개선시키지 않는다는 것을 알게 되었다. 즉, 이미지를 다운로드함으로써 병목현상이 발생하는 경우는 극히 드물다고 한다. [참고한 글](https://web.dev/blog/common-misconceptions-lcp?hl=ko)

---

> 2-4부터는 큰 이미지(5000x5000)를 저장해서 불러온 방식에서 api로 고해상도이며 사이즈가 큰 이미지 리스트를 불러와서 사용했다. 실제로 작업할땐 이런 방식보다 api 방식으로 이미지를 불러오는 것이 좀 더 현실적인 것 같아서 이미지 불러오는 방식을 변경했다.

```
// 기존 방식
  const images = Array.from({ length: 100 }, (_, index) => (
    <img key={index} src={image} width="100%" loading="lazy" />
  ));
```

```
// 새로운 방식
const Images = () => {
  const fetcImages = () => {
    return fetch('https://picsum.photos/v2/list').then((res) => res.json());
  };

  const { data } = useQuery({
    queryKey: ['images'],
    queryFn: () => fetcImages(),
  });

  if (!data) return;

  console.log(data);
  return (
    <div>
      {data.map((image) => (
        <img key={image.id} src={image.download_url} width="100%" />
      ))}
    </div>
  );
};
```

변경한 방식으로 성능 측정한 점수
![](https://velog.velcdn.com/images/oaksusu/post/4f161920-9e80-4f25-9682-1dadfaa652a3/image.png)

### 2-4. 이미지 사이즈 조정

이미지가 해상도에 따라 width: 100%일 경우에는 LCP와 TBT를 측정할 수가 없고 해결이 가능한 부분이 아니라고 판단했다.
만약에 실무에서 이와 같은 요구사항이 있을 경우 이미지가 과도하게 큰 사이즈이고 고해상도일 경우 성능에 문제가 있음을 사전에 얘기하고,이미지 사이즈를 조정할 수 있는 방안으로 협의를 해야겠다고 생각했다.
이미지 사이즈를 조정한 결과 아래의 점수로 개선시킬 수 있었다.
![](https://velog.velcdn.com/images/oaksusu/post/b3e241e3-2812-4726-ae8b-219bc81c6ac5/image.png)

### 2-5. loading="lazy" 속성 적용

이미지 사이즈를 줄이다 보니 화면안에 보여질 이미지들이 많아졌고 이미지들이 렌더링되는데 시간이 걸리는게 눈에 띄었다.
뷰포트내에 들어오지 않는 이미지들은 나중에 렌더링되도록 이미지한테 loading="lazy"속성을 적용시켜보았지만, 점수에 별차이가 없었다.
![](https://velog.velcdn.com/images/oaksusu/post/2db6ed87-dd0d-4670-af92-8b1953bda644/image.png)

### 2-5. IntersectionObserver API

이번엔 속성만 적용시키는 것이 아닌, 뷰포트안에 들어오면 렌더링되도록 IntersectionObserver API를 이용해서 기능적으로 구현해봤다. 점수는 매번 다르게 나오지만 평균적으로 60점대로 나오는데, 가장 높을때는 65점이 나왔다.
![](https://velog.velcdn.com/images/oaksusu/post/62322afd-0779-4d01-b352-edfa48cfd3ed/image.png)

### 2-6. 스켈레톤

성능 점수는 뒤로하고, 이미지들이 렌더링될때 아래 첨부한 이미지처럼 보여지고 있어서 이미지가 렌더링될 부분에는 스켈레톤을 넣어서 UX를 개선시키고자 했다.
그런데 스켈레톤을 적용시켜도 깜빡임만 보일뿐 스켈레톤이 보이지 않았다...
[스켈레톤 적용 전]
![](https://velog.velcdn.com/images/oaksusu/post/d7f5497c-1368-416a-97fa-8d7574e235ae/image.png)
[스켈레톤 적용 후]
![](https://velog.velcdn.com/images/oaksusu/post/5c747472-4511-4bff-bc7c-67e22ecb8049/image.png)
![](https://velog.velcdn.com/images/oaksusu/post/99a5bebf-c97b-459f-a11b-b8840890210a/image.gif)

### 2-6. 중간점검

한번 중간점검해보고자, 빌드 후 다시 점수를 측정해보았다.
여전히 LCP는 개선이 필요해 보인다.
![](https://velog.velcdn.com/images/oaksusu/post/0461394a-3f60-47ed-9048-cff484212e5a/image.png)

### 2-7. 스켈레톤 개선

스켈레톤을 적용시켰는지 확인도 안될만큼 UX 개선이 안되어서,
img의 로드 이벤트를 활용하여 로드되기 전까지는 스켈레톤이 보이도록 했더니 UX는 훨씬 나아졌다.
![](https://velog.velcdn.com/images/oaksusu/post/f91f3553-fa0c-4b9c-948d-550fd2c07b26/image.gif)

그러나! 성능 점수는 다시 50점대로 내려갔다...
![](https://velog.velcdn.com/images/oaksusu/post/941a6baf-dcb3-41d7-afc6-1b3f44180e44/image.png)
