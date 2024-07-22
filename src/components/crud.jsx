import { useEffect, useState } from "react"
import { Button, EditableText, InputGroup, Toaster} from "@blueprintjs/core";

const AppToaster = Toaster.create({
    position: "top"
})

export function CRUD(){
    const [userDetails, setUserDetails] = useState([]);
    const [addUser, setAddUser] = useState({});

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((resJson) => setUserDetails(resJson))
    }, [])

    function addUserDetails(e){
       const event = e.target;
       setAddUser((prev) => {
            return ({
                ...prev, [event.name] : event.value
            })
        })
    }

    function addUserToTable() {
        if(addUser.name && addUser.email && addUser.website){
            fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                body: JSON.stringify(addUser),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                setUserDetails([...userDetails, json]);
                AppToaster.show({
                    message: 'User Added Successfully',
                    timeout: 3000,
                    intent: 'success'
                })
                setAddUser({})
            })
        }
    }

    return(
        <>
            <table className="table table-bordered rounded-3 mt-5">
                <thead>
                    <tr>    
                        <th> ID </th>
                        <th> Name </th>
                        <th> Email Id </th>
                        <th> Website </th>
                        <th> Action </th>
                        </tr>
                </thead>
                <tbody>
                    {
                        userDetails?.map((data) => {
                            return(
                                <tr>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>
                                        <EditableText value={data.email}/>
                                    </td>
                                    <td>
                                        <EditableText value={data.website}/>
                                    </td>
                                    <td>
                                        <Button className="me-2" intent="success"> Update </Button>
                                        <Button className="" intent="danger"> Delete </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td><InputGroup placeholder="Enter Name" value={addUser.name} name="name" onChange={addUserDetails}/></td>
                        <td><InputGroup placeholder="Enter Email" value={addUser.email} name="email" onChange={addUserDetails}/></td>
                        <td><InputGroup placeholder="Enter Website" value={addUser.website} name="website" onChange={addUserDetails}/></td>
                        <td>
                            <Button intent="primary" onClick={addUserToTable}>Add User</Button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}