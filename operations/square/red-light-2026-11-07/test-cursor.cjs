const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const src=fs.readFileSync(__dirname+'/manager-repaired.gs','utf8');
const fn=src.slice(src.indexOf('function mssm166FindItemsByText_'),src.indexOf('function mssm166Retrieve_'));
const item=id=>({type:'ITEM',id,item_data:{name:'Red light'}});
let tests=0;
function run(pages,expected,error){let calls=0;const c={mssm166Api_:()=>{if(calls>=pages.length)throw Error('Unexpected API call');return pages[calls++];}};vm.createContext(c);vm.runInContext(fn,c);if(error)assert.throws(()=>c.mssm166FindItemsByText_('red light',{}),error);else assert.deepEqual(JSON.parse(JSON.stringify(c.mssm166FindItemsByText_('red light',{}))).map(x=>x.id),expected);tests++;}
run([{items:[item('A')],cursor:''}],['A']);run([{cursor:''}],[]);run([{}],[]);run([{items:[item('A')]}],['A']);
run([{items:[item('A')],cursor:'next'},{items:[item('B')],cursor:''}],['A','B']);
for(const bad of [null,[],{raw:'html'},{items:{}},{items:null},{cursor:1},{cursor:null},{cursor:' '},{errors:[{code:'ERROR'}]}])run([bad],null,/invalid/);
run([{items:[item('A')],cursor:'next'},{items:[item('A')]}],null,/repeated/);
run([{cursor:'next'},{cursor:'next'}],null,/repeated/);
run(Array.from({length:100},(_,i)=>({cursor:'page'+i})),null,/page limit/);
console.log(JSON.stringify({ok:true,tests,squareCalls:0}));
