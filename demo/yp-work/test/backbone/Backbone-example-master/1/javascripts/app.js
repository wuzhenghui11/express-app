
$(function(){
	var dolymood = {
	};

	(function (dolymood) {
		
		var userid = 0;
		
		var View = Backbone.View.extend({
			register:function (state) {
				this.state = state;
				return this;
			}
		});

		var User = Backbone.Model.extend({
			defaults: {
				username: '默认用户名'
			},
			initialize: function() {
			    if (!this.get("username")) {
				    this.set({"username": this.defaults.username});
			    }
			    if (!this.get("userid")) {
				    this.set({"userid": ++userid});
				}
			}
		});

		var UserCollection = Backbone.Collection.extend({
			model: User,
			// 持久化到本地数据库
			localStorage: new Store("users")
		});
		
		var UserItemView = View.extend({
			tagName: 'li',
			template: _.template($('#user-item-template').html()),
			render: function () {
				this.$el.html(this.template(this.model.toJSON()));
				return this;
			},
			events:{
				'click .removeUser': 'deleteUser',
				'click .viewUser': 'viewUser'
			},
			viewUser: function() {
			    this.state.trigger('viewUser', this.model);
			},
			deleteUser: function () {
				this.state.trigger('removeUser', this.model);
				this.remove();
			}
		});
		
		// 首页 View
		var UserListView = View.extend({
			template: _.template($('#list-template').html()),
			initialize:function () {// 这个对象有两个属性UserCollection的实例userCollection，第二个属性router
				var view = this;
				// 实例化一个Model
				this.state = new Backbone.Model();
				// Router的实例赋值给this.router
				this.router = this.options.router;
				// 调用fetch的时候触发reset
				this.collection.unbind('reset');//如果没有指定callback，所有绑定这个事件回调函数将被移除；如果没有指定event，所有事件的回调函数会被移除。
			    this.collection.bind('reset', this.addAll, this); // 绑定reset事件 执行回调函数this.addAll,当回调函数被调用时，通过可选的第三个参数可以为this
				                                                  // 提供一个context（上下文）值
				setTimeout(function() {
					view.collection.fetch(); // 这里用this的话指向的是全局，所以用view代替this 指向UserListView的实例
				}, 0);
			},
			render:function () {
				var view = this;
				this.$el.html(this.template(this.state.toJSON()));
				this.state.bind('removeUser', function (user) {
					user.destroy();//为了修改服务端数据
					view.collection.remove(user);
				});
				this.state.bind('viewUser', function (user) {
					view.router.navigate('user/' + user.cid, {trigger:true});
				});
				return this;
			},
			createUserItemView:function (user) {
				var userItemView = new UserItemView({
					model: user
				});
				userid = Math.max.call(null, user.get('userid'), userid);//确保userid会一直从最大的开始增加
				console.log(userid);
				userItemView.register(this.state).render().$el.appendTo($('#list'));
			},
			addAll: function() {
				this.collection.each(this.createUserItemView.bind(this));
			}
		});
		
		// 用户查看
		var UserView = View.extend({
			template: _.template($('#user-template').html()),
			initialize:function () {
				this.router = this.options.router;
			},
			render: function () {
				var view = this;
				this.$el.html(this.template(this.model.toJSON()));
				return this;
			},
			events:{
				'click .editUser': 'editUser'
			},
			editUser: function() {
				this.router.navigate('edit/' + this.model.cid, {trigger:true});
				this.remove();
			}
		});
		// 用户修改
		var UserModifyView = View.extend({
			template: _.template($('#modify-template').html()),
			initialize:function () {
				this.router = this.options.router;
			},
			render:function () {
				var view = this;
				if (this.model) {
				    this.$el.html(this.template(this.model.toJSON()));
				} else {
				    this.$el.html(this.template({username: ''}));
				}
				setTimeout(function() {
					view.$el.find('input').focus().select();//设置焦点并选中
				}, 0);
				return this;
			},
			events:{
				'click a.add': 'modify'
			},
			modify: function () {
				var view = this;
				if (this.model) {
					//this.model.set('username', this.$el.find('input').val());
					this.model.save({'username': this.$el.find('input').val()});//更改服务端数据
				} else {
					this.router.userCollection.create(new User({
						username:view.$el.find('input').val(),
						userid: ++userid
					}));
				}
				this.router.navigate('list', {trigger:true});
			}
		});
		// 路由
		dolymood.App = Backbone.Router.extend({
			initialize:function (el) {
				this.el = el;
				//this.userCollection = new UserCollection([new User({username:'张三', userid: ++userid})]);
			    this.userCollection = new UserCollection();
			},
			routes:{
				'':'list',
				'list':'list',
				'add':'edit',
				'edit/:cid':'edit',
				'user':'user',
				'user/:cid':'user'
			},
			list:function () {
				var router = this;
				this.clean();
				this.currentView = new UserListView({
						collection: router.userCollection,
						router:router
					}
				).render().$el.appendTo($(this.el));
				
			},
			edit:function (cid) {
				var router = this,
					user = null;
				this.clean();

				if (cid) {
					user = router.userCollection.getByCid(cid);
				}
				this.currentView = new UserModifyView({
					model:user,
					router:router
				}).render().$el.appendTo($(this.el));
			},
			user: function(cid) {
				var router = this,
					user = null;
				this.clean();

				if (cid) {
					user = router.userCollection.getByCid(cid);
				}
				this.currentView = new UserView({
					model:user,
					router:router
				}).render().$el.appendTo($(this.el));
			},
			clean:function () {
				if (this.currentView) {
					this.currentView.remove();
					this.currentView = null;
				}
			}
		});
	}(dolymood));
	
	new dolymood.App('body');
	Backbone.history.start();
});