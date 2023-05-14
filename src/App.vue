<template>
  <div>
    <div id="calculator">
      <input id="input" type="text" ref="Ip" v-model='val'/>
      <br />

      <button @click="addToInput('sin(')">sin</button>
      <button @click="addToInput(1)">1</button>
      <button @click="addToInput(2)">2</button>
      <button @click="addToInput(3)">3</button>
      <button @click="addToInput('+')">+</button>
      <button @click="addToInput('^')">^</button>
      <br />
      <button @click="addToInput('cos(')">cos</button>
      <button @click="addToInput(4)">4</button>
      <button @click="addToInput(5)">5</button>
      <button @click="addToInput(6)">6</button>
      <button @click="addToInput('-')">-</button>
      <button @click="clearInput">C</button>
      <br />
      <button @click="addToInput('tan(')">tg</button>
      <button @click="addToInput(7)">7</button>
      <button @click="addToInput(8)">8</button>
      <button @click="addToInput(9)">9</button>
      <button @click="addToInput('*')">*</button>
      <button @click="delInput">del</button>
      <br />
      <button @click="addToInput('ctg(')">ctg</button>
      <button @click="addToInput('(')">(</button>
      <button @click="addToInput('0')">0</button>
      <button @click="addToInput(')')">)</button>
      <button @click="addToInput('/')">/</button>
      <button @click="calculateResult">=</button>
      <br />

      <div>
        Результат: <strong>{{ result }}</strong>
      </div>

      
      <button @click="showList">Показать список предыдущих вычислений</button>

      <div v-if="dataLoaded">
        <li v-for="item in prevResult">{{item}}</li>
      </div>
    </div>
  </div>
</template>

<script>
import {writeToFirebase, readFromFirebase} from './DB/storage'
export default {
  data() {
    return {
      val: "",
      result: 0,
      dataLoaded: false,
      prevResult:[]
    };
  },
  methods: {
    addToInput(value) {
      this.val += value;
    },

    delInput() {
      this.val = this.val.slice(0, -1);
    },

    clearInput() {
      this.val = "";
      this.result = 0;
    },

    calculateResult() {
      let input = this.val;

      input = input.replace("sin", "Math.sin");
      input = input.replace("cos", "Math.cos");
      input = input.replace("tan", "Math.tan");
      input = input.replace("ctg", "1/Math.tan");
      input = input.replace("^", "**");

      try {
        this.result = eval(input);
        writeToFirebase(this.val, this.result, new Date());
      } catch (error) {
        console.log
      }
    },

    async showList(){
      this.prevResult = [];
      this.prevResult = await readFromFirebase();
      this.dataLoaded = true;
    }
  },
};
</script>

<style>
#calculator {
  width: 800px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #f7f7f7;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  font-family: Arial, sans-serif;
}
input[type="text"] {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 5px;
  font-size: 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1) inset;
}
button {
  display: inline-block;
  width: 15%;
  margin: 5px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #4caf50;
  border: 1px solid #4caf50;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}
button:hover {
  background-color: #3e8e41;
  border: 1px solid #3e8e41;
}
button:active {
  background-color: #388e3c;
  border: 1px solid #388e3c;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3) inset;
}
button.clear {
  background-color: #f44336;
  border: 1px solid #f44336;
}
button.clear:hover {
  background-color: #c62828;
  border: 1px solid #c62828;
}
button.clear:active {
  background-color: #b71c1c;
  border: 1px solid #b71c1c;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3) inset;
}
</style>
