const fullname = 'Anh Điệp xấu trai cc à?'

console.log(fullname)

type Handle = () => Promise<string> //định nghĩa rằng handle là 1 promise trả ra string
const handleF: Handle = () => Promise.resolve(fullname + ' ahihi')
//xài thử thử hàm handleF
handleF().then((res) => {
  console.log(res)
})

// const person: any = {};

const person: { name: string; age: number } = { name: 'Điệp', age: 15 }
