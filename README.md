# react-utils-hooks
react hooks for nomal utils
## Installation
```
npm install react-utils-hooks
```
## Usage
```
import { useSafeState } from 'react-utils-hooks';

```
## APIS
### useSafeState
保证页面加载完毕之后再执行render，可避免未渲染完毕执行render而影响性能；
```
const [val, setVal] = useSafeState();
```
### usePrevious
获取到上一个状态的值
```
const [count, setCount] = useState(0);
const previousCount = usePrevious(count);
```
### useIsMounted
判断页面是否加载完毕
```
const isMounted = useMounted()
```
### useDidMount
类似componentDidmount
```
useDidMount(()=> {
  //加载完成之后执行逻辑
})
```
### useWillMount
类似componentWillmount
```
useWillMount(()=> {
  //页面渲染之前执行逻辑
})
```
### useDidUpdate
页面更新操作
```
useDidUpdate(()=> {
  //更新逻辑
},[deps])
```


