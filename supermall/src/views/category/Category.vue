<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <button @click="btnClick">按钮</button>
      <li>产品项目1</li>
      <li>产品项目2</li>
      <li>产品项目3</li>
      <li>产品项目4</li>
      <li>产品项目5</li>
      <li>产品项目6</li>
      <li>产品项目7</li>
      <li>产品项目8</li>
      <li>产品项目9</li>
      <li>产品项目10</li>
      <li>产品项目11</li>
      <li>产品项目12</li>
      <li>产品项目13</li>
      <li>产品项目14</li>
      <li>产品项目15</li>
      <li>产品项目16</li>
      <li>产品项目17</li>
      <li>产品项目18</li>
      <li>产品项目19</li>
      <li>产品项目20</li>
      <li>产品项目21</li>
      <li>产品项目22</li>
      <li>产品项目23</li>
      <li>产品项目24</li>
      <li>产品项目25</li>
      <li>产品项目26</li>
      <li>产品项目27</li>
      <li>产品项目28</li>
      <li>产品项目29</li>
      <li>产品项目30</li>
      <li>产品项目31</li>
      <li>产品项目32</li>
      <li>产品项目33</li>
      <li>产品项目34</li>
      <li>产品项目35</li>
      <li>产品项目36</li>
      <li>产品项目37</li>
      <li>产品项目38</li>
      <li>产品项目39</li>
      <li>产品项目40</li>
      <li>产品项目41</li>
      <li>产品项目42</li>
      <li>产品项目43</li>
      <li>产品项目44</li>
      <li>产品项目45</li>
      <li>产品项目46</li>
      <li>产品项目47</li>
      <li>产品项目48</li>
      <li>产品项目49</li>
      <li>产品项目50</li>
      <li>产品项目51</li>
      <li>产品项目52</li>
      <li>产品项目53</li>
      <li>产品项目54</li>
      <li>产品项目55</li>
      <li>产品项目56</li>
      <li>产品项目57</li>
      <li>产品项目58</li>
      <li>产品项目59</li>
      <li>产品项目60</li>
      <li>产品项目61</li>
      <li>产品项目62</li>
      <li>产品项目63</li>
      <li>产品项目64</li>
      <li>产品项目65</li>
      <li>产品项目66</li>
      <li>产品项目67</li>
      <li>产品项目68</li>
      <li>产品项目69</li>
      <li>产品项目70</li>
      <li>产品项目71</li>
      <li>产品项目72</li>
      <li>产品项目73</li>
      <li>产品项目74</li>
      <li>产品项目75</li>
      <li>产品项目76</li>
      <li>产品项目77</li>
      <li>产品项目78</li>
      <li>产品项目79</li>
      <li>产品项目80</li>
      <li>产品项目81</li>
      <li>产品项目82</li>
      <li>产品项目83</li>
      <li>产品项目84</li>
      <li>产品项目85</li>
      <li>产品项目86</li>
      <li>产品项目87</li>
      <li>产品项目88</li>
      <li>产品项目89</li>
      <li>产品项目90</li>
      <li>产品项目91</li>
      <li>产品项目92</li>
      <li>产品项目93</li>
      <li>产品项目94</li>
      <li>产品项目95</li>
      <li>产品项目96</li>
      <li>产品项目97</li>
      <li>产品项目98</li>
      <li>产品项目99</li>
      <li>产品项目100</li>
    </ul>
  </div>
</template>

<script>
  import BScroll from "@better-scroll/core"
  import Pullup from "@better-scroll/pull-up"
export default {
  name: 'Category',
  data() {
    return {
      scroll: null
    }
  },
  methods: {
    btnClick() {
      console.log("按钮被点击");
    }
  },
  mounted() {
      BScroll.use(Pullup);
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        pullUpLoad: true
      })

      // this.scroll.on('scroll',position => {
      //   console.log(position);
      // })
      this.scroll.on('pullingUp',() => {
        console.log("正在上拉加载");
        this.scroll.finishPullUp();
      })
  }
}
</script>

<style scoped>
  .wrapper {
    height: 300px;
    background-color: pink;
    overflow: hidden;
  }
</style>