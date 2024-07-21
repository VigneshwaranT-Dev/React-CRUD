import { useEffect, useState } from "react"

export function CRUD(){
    const [userDetails, setUserDetails] = useState();
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((resJson) => setUserDetails(resJson))
    }, [])

    return(
        <>
            <table className="table table-bordered">
                <thead>
                    <tr>    
                        <th> ID </th>
                        <th> Name </th>
                        <th> UserName </th>
                        <th> Email Id </th>
                        <th> Company </th>
                        <th> Website </th>
                        <th> Address </th>
                        <th> Action </th>
                        </tr>
                </thead>
                <tbody>
                    {
                        userDetails?.map((data, i) => {
                            return(
                                <tr>
                                    <td key={i} >{data.id}</td>
                                    <td key={i} >{data.name}</td>
                                    <td key={i} >{data.username}</td>
                                    <td key={i} >{data.email}</td>
                                    <td key={i} >{data.company.name}</td>
                                    <td key={i} >{data.website}</td>
                                    <td key={i} >
                                        {
                                            data.address.suite + ', ' + data.address.street + ', ' + data.address.city + ', ' + data.address.zipcode
                                        }
                                    </td>
                                    <td key={i} >
                                        <button className="btn btn-success me-3"> Update </button>
                                        <button className="btn btn-danger"> Delete </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}