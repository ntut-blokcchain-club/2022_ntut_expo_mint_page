import { ethers } from "ethers";
import fish_abi from "./fish.json";

async function mint(uuid, set_finish, finish) {
  console.log(uuid);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const fish_Address = "0xd1d859a7727Bb3E5B305C4168A44B93c809c07Eb";
  const fish_Contract = new ethers.Contract(fish_Address, fish_abi, provider);
  const signer = provider.getSigner();
  const test = await fish_Contract.mintable();
  console.log("mintable " + test);
  const fish_with_signer = fish_Contract.connect(signer);
  const uuid_with_json = uuid + ".json";
  const mint_tx = await fish_with_signer.mintFish(uuid_with_json);
  console.log(mint_tx);

  const local_data = JSON.parse(window.localStorage.getItem("local_data"));

  local_data.map((data, index) => {
    data = JSON.parse(data);
    console.log("props.uuid" + uuid + " ", data["uuid"]);

    if (data["uuid"] === uuid) {
      data["minted"] = true;
      local_data[index] = JSON.stringify(data);
      window.localStorage.setItem("local_data", JSON.stringify(local_data));
      console.log(data);
      set_finish(!finish);
    }
  });
  return(!finish)
}

export default mint;
