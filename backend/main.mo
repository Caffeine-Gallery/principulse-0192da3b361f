import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Iter "mo:base/Iter";

import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Error "mo:base/Error";

actor {
    // Initialize a stable variable to store principals
    private stable var principalEntries : [(Principal, Bool)] = [];
    
    // Create HashMap to store principals
    private var principals = HashMap.HashMap<Principal, Bool>(
        10, 
        Principal.equal, 
        Principal.hash
    );

    // System functions for upgrade persistence
    system func preupgrade() {
        principalEntries := Iter.toArray(principals.entries());
    };

    system func postupgrade() {
        principals := HashMap.fromIter<Principal, Bool>(
            principalEntries.vals(),
            10,
            Principal.equal,
            Principal.hash
        );
    };

    // Check if principal is recorded
    public shared query(msg) func isRecorded() : async Bool {
        let caller = msg.caller;
        switch (principals.get(caller)) {
            case (?exists) { exists };
            case null { false };
        };
    };

    // Record a new principal
    public shared(msg) func recordPrincipal() : async Bool {
        let caller = msg.caller;
        if (Principal.isAnonymous(caller)) {
            throw Error.reject("Anonymous principal not allowed");
        };
        
        principals.put(caller, true);
        true;
    };
};
