function isValueNumber (value) { 
  return ( /(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/ ).test(value + '');
}

Vue.component('input-number',{
  template:`
    <div class="input-number">
      <input type="text" :value="currentValue" @change="handleChange" @keyup="handleFocus">
      <button @click="handleDown" :disabled="currentValue <= min">-</button>
      <button @click="handleUp" :disabled="currentValue >= max">+</button>
    </div>`,
  props:{
    max:{
      type:Number,
      default:Infinity
    },
    min:{
      type:Number,
      default:-Infinity
    },
    value:{
      type:Number,
      default:0
    },
    // 步伐
    step:{
      type:Number,
      default:5
    }
  },
  data(){
    return{
      currentValue:this.value
    }
  },
  watch:{
    currentValue(val) {
      this.$emit('input',val)
      this.$emit('on-change',val)
    },
    value(val) {
      this.updateValue(val)
    }
  },
  methods: {
    updateValue(val){
      if(val > this.max) val = this.max
      if(val < this.min) val = this.min
      this.currentValue = val
    },
    handleDown(){
      if(this.currentValue <= this.min) return
      if(this.step){
        this.currentValue -= this.step
      }else{
        this.currentValue -= 1
      }
    },
    handleUp(){
      if(this.currentValue >= this.max) return
      if(this.step){
        this.currentValue += this.step
      }else{
        this.currentValue += 1
      }
    },
    handleChange(event){
      let val  = event.target.value.trim()
      let max  = this.max
      let min  = this.min
      if(isValueNumber(val)){
        val = Number(val)
        this.currentValue = val
        if(val > max){
          this.currentValue = max
        }else if (val < min){
          this.currentValue = min
        }
      }else {
        event.target.value = this.currentValue
      }
    },
    handleFocus(event){
      if(event.keyCode === 38){
        this.currentValue += 1
      }else{
        this.currentValue -= 1
      }
    }
  },
  mounted() {
    this.updateValue(this.value)
  },
})