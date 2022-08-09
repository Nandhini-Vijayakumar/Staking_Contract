
import React,{useRef, useState} from 'react';
import web3 from './web3';
import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { tokenaddress1,tokenaddress2,tokenaddress3,abi1,abi2,abi3 } from './abi';
import './App.css';

function App() {
  const stkamt=useRef(null);
  const unstkamt=useRef(null);
  const[totalsupply,settotalsupply]=useState("");
  const[balance,setbalance]=useState("");
  const[amt,setamt]=useState("");
 

  const Serc20contract = new web3.eth.Contract(abi1, tokenaddress1);
  const Rerc20contract = new web3.eth.Contract(abi2, tokenaddress2);
  const Stakecontract = new web3.eth.Contract(abi3, tokenaddress3);

  const connect = async()=>{
    let accounts=await web3.eth.getAccounts();
    // web3.eth.getChainId().then(console.log);
    // const networkid=await web3.eth.getChainId();
    // console.log("network id",networkid);
     await web3.eth.getAccounts().then(()=>{          
         console.log("acc Ethereum",accounts[0])
         
         window.wallet=accounts[0];
        
        localStorage.setItem("wallet",accounts[0])
        //sessionStorage.setItem("wallet", accounts[0]);
       })
      }

      const approve=async()=>{
        const accounts = await web3.eth.getAccounts();
        await Serc20contract.methods.approve("0x7790c9209A52d7c2EbEE438588C8FB9979C68fE5",web3.utils.toBN(1000000000)).send({from:accounts[0]});
        await Rerc20contract.methods.approve("0x7790c9209A52d7c2EbEE438588C8FB9979C68fE5",web3.utils.toBN(1000000000)).send({from:accounts[0]});
        window.alert("Approved Successfully");
      }
      const stake=async()=>{
        const accounts = await web3.eth.getAccounts();
        await Stakecontract.methods.stake(stkamt.current.value*(10**6)).send({from:accounts[0]});
        window.alert("Successfully Staked");

      }

      const unstake=async()=>{
        const accounts = await web3.eth.getAccounts();
        console.log(unstkamt.current.value*(10**6));
        await Stakecontract.methods.unStake(unstkamt.current.value*(10**6)).send({from:accounts[0]});
       window.alert("Successfully Unstaked");
      }

      const claimrewards=async()=>{
        const accounts = await web3.eth.getAccounts();
        await Stakecontract.methods.getReward().send({from:accounts[0]});
        window.alert("Successfully Rewarded");
        }
      const handle1=async()=>{
       let a=await Stakecontract.methods.totalSupply().call()
           settotalsupply(a);
      }
      const handle2=async()=>{
        const accounts = await web3.eth.getAccounts();
        let a=await Stakecontract.methods.balance(accounts[0]).call();
          setbalance(a);
      }
      const handle3=async()=>{
        const accounts = await web3.eth.getAccounts();
        let a=await Stakecontract.methods.stakedAmount(accounts[0]).call();
          setamt(a);
      }
  return (
    <div className="App">
      <h1>STAKE CONTRACT</h1>
      {/* <label>Address</label>&nbsp;&nbsp;<input ref={addr} type="text" id="addr" name="addr" placeholder='enter the address'></input>
      <br/><br/>
      <label>Amount</label>&nbsp;&nbsp;<input ref={amt} type="text" id="amt" name="amt" placeholder='enter the numToken'></input> */}
      <br/>
      <Button onClick={connect}>Connect Wallet</Button>&nbsp;&nbsp;
      <Button onClick={approve}>Approve</Button>
      <br/><br/>
     <input ref={stkamt} type="text" id="stkamt" name="stkamt" placeholder='enter the amount'/>
     &nbsp;&nbsp;<Button variant="success" onClick={stake}>Stake</Button><br/><br/>
     <input ref={unstkamt} type="text" id="unstkamt" name="unstkamt" placeholder='enter the amount'/>
     &nbsp;&nbsp;<Button variant="warning" onClick={unstake}>UnStake</Button>
    <br/><br/><Button variant="secondary" onClick={claimrewards}>ClaimRewards</Button>
    <br/><br/>
        <Button variant="info" onClick={handle1}>TotalSupply</Button>
        &nbsp;&nbsp;<h4>{totalsupply}</h4>
      <Button variant="info" onClick={handle2}>Balance</Button>
      &nbsp;&nbsp;<h4>{balance}</h4>
      <Button variant="info" onClick={handle3}>Staked Amount</Button>
      &nbsp;&nbsp;<h4>{amt}</h4>
     
    </div>
  );
}

export default App;
