'use strict';

import UserService from './../../services/user/user.service';
import CompanyService from './../../services/company/company.service';

import template from './view-profile.template.html';
import './view-profile.style.css';

class ViewProfileComponent {
    constructor(){
        this.controller = ViewProfileComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewProfile';
    }


}

class ViewProfileComponentController{
    constructor($state,UserService,CompanyService){
        this.$state = $state;
        this.UserService = UserService;
        this.CompanyService = CompanyService;
    }


    isUserCompany() {
		if (this.currentUser.type === 'company') {
		  return true;
		}
		return false;
	}

	
	$onInit() {

		if (this.UserService.isAuthenticated()) {
			this.currentUser = this.UserService.getCurrentUser();
			if (this.isUserCompany()) {
				this.company = [];
				
				
				this.CompanyService.get(this.currentUser.company).then(company => {
					this.company = company;
						
				});
				
				
			}
		}
	}
	
    static get $inject(){
        return ['$state', UserService.name, CompanyService.name];
    }
}


export default ViewProfileComponent;