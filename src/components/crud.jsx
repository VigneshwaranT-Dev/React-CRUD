import { useEffect, useState } from "react"
import { Button, EditableText, InputGroup, Toaster, Tooltip} from "@blueprintjs/core";

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
                document.getElementById('name').value = ''
                document.getElementById('email').value = ''
                document.getElementById('website').value = ''
            })
        }
    }

    function updateUser(id){
        const user = userDetails.find((user) => user.id === id);
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }
        )
        .then((response) => response.json())
        .then(json => {
            AppToaster.show({
                message: 'User Updated Successfully',
                timeout: 3000,
                intent: 'primary'
            })
        })
    }

    function deleteUser(id){
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE'
        })
        .then((response) => response.json())
        .then((json) => {
           setUserDetails((users) => {
            return users.filter((user) => user.id !== id)
           })
           AppToaster.show({
            message: 'User Deleted Successfully',
            timeout: 3000,
            intent: 'danger'
        })
        })
    }

    function onChangeHandler(id, key, value){
        setUserDetails((users) => {
            return users.map((user) => {
                return user.id === id ? {...user, [key] : value} : user
            })
        })
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
                        userDetails.map(data => 
                            <tr key={data.id}>
                                <td>
                                    <Tooltip content={data.id}>
                                        {data.id}
                                    </Tooltip>
                                </td>
                                <td>
                                    <Tooltip content={data.name}>
                                        {data.name}
                                    </Tooltip>
                                </td>
                                <td>
                                    <Tooltip content={data.email}>
                                        <EditableText value={data.email} onChange={value => onChangeHandler(data.id, 'email', value)}/>
                                    </Tooltip>
                                </td>
                                <td>
                                    <Tooltip content={data.website}>
                                        <EditableText value={data.website} onChange={value => onChangeHandler(data.id, 'website', value)}/>
                                    </Tooltip>
                                </td>
                                <td>
                                    <Button className="me-2" intent="success" onClick={() => updateUser(data.id)}> Update </Button>
                                    <Button className="" intent="danger" onClick={() => deleteUser(data.id)}> Delete </Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td><InputGroup placeholder="Enter Name" name="name" id="name" onChange={addUserDetails}/></td>
                        <td><InputGroup placeholder="Enter Email" name="email" id="email" onChange={addUserDetails}/></td>
                        <td><InputGroup placeholder="Enter Website" name="website" id="website" onChange={addUserDetails}/></td>
                        <td>
                            <Button intent="primary" onClick={addUserToTable}>Add User</Button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}