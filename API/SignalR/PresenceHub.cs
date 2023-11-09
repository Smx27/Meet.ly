using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class PresenceHub : Hub
    {
        private readonly PresenceTracker tracker;

        public PresenceHub(PresenceTracker tracker)
        {
            this.tracker = tracker;
        }
        public override async Task OnConnectedAsync()
        {
            await tracker.UserConnected(Context.User.getUserName(), Context.ConnectionId);

            await Clients.Others.SendAsync("UserIsOnline", Context.User.getUserName());

            var currentUsers = await tracker.GetOnlineUsers();

            await Clients.All.SendAsync("GetOnlineUsers", currentUsers);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await tracker.UserDisconnected(Context.User.getUserName(), Context.ConnectionId);

            await Clients.Others.SendAsync("UserIsOffline", Context.User.getUserName());

            var currentUsers = await tracker.GetOnlineUsers();

            await Clients.All.SendAsync("GetOnlineUsers", currentUsers);

            await base.OnDisconnectedAsync(exception);
        }
    }
}