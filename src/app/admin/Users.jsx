import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useMemberUtils } from "@/hooks/useMemberUtils";
import CodeEditor from "@/components/CodeEditor";
function Users() {
  const { capitalizeStr } = useMemberUtils();
  const { user } = useUser();
  const userName = capitalizeStr(user?.firstName + " " + user.lastName);
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User : {userName}</h2>
      <p className=" mb-4">UserEmail : {userEmail}</p>
      {/* <CodeEditor /> */}
    </div>
  );
}

export default Users;
